<template>
    <div class="card">
    <div class="card-body">

      
      <form ref="form" @submit.stop.prevent="handleUpdate">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="TDL.name"
            :state="nameState"
            required
          />
        </b-form-group>
        <b-form-group
          label="Description"
          label-for="description-input"
          invalid-feedback="description is required"
          :state="descriptionState"
        >
          <b-form-input
            id="name-input"
            type="description"
            v-model="TDL.description"
            :state="descriptionState"
            required
          />
        </b-form-group>
        <b-form-group
          label="Created_at"
          label-for="description-input"
          invalid-feedback="created_at is required"
          :state="created_atState"
        >
          <b-form-input
            id="name-input"
            type="date"
            v-model="TDL.created_at"
            :state="created_atState"
            required
            
          />
        </b-form-group>
        <b-form-group>
          <input type="submit" value="Simpan" class="btn btn-success">
        </b-form-group>
      </form>
    </div>
    </div>
  </template>

<script>
import { db } from "@/firebaseDb";
export default {
    name: "edit-data",
    data() {
        return {
            ToDo_List: [],
            TDL: {
                name: "",
                description: "",
                created_at: "",
            },
            nameState: null,
            descriptionState: null,
            created_atState: null,
        };
    },
    created() {
        let dbRef = db.collection("ToDo_List").doc(this.$route.params.id);
        dbRef
            .get()
            .then((doc) => {
                this.TDL = doc.data();
                console.log(this.TDL);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.nameState = valid;
            this.created_atState = valid;
            this.descriptionState = valid;
            return valid;
        },
        getOneData(data) {
            this.TDL.key = data.key;
            this.TDL.name = data.name;
            this.TDL.description = data.description;
            this.TDL.created_at = data.created_at;
            this.$refs["modal-edit"].show();
        },
        makeToast(variant = null) {
            this.$bvToast.toast("Data successfully edited", {
                title: `Edit ToDo_List`,
                variant: variant,
                solid: true,
            });
        },
        handleUpdate() {
            if (!this.checkFormValidity()) {
                return;
            }
            db.collection("ToDo_List")
                .doc(this.$route.params.id)
                .update(this.TDL)
                .then(() => {
                    this.makeToast("warning");
                    delete this.TDL.key;
                    this.$refs["modal-edit"].hide();
                    // reset form value
                    this.TDL.name = "";
                    this.TDL.description = "";
                    this.TDL.created_at = "";
                    this.loadData();
                })
                .catch((err) => {
                    console.log(err);
                });
            this.$router.push({ name: "home-layar" });
        },
    },
};
</script>