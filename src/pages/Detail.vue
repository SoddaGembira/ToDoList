<template lang="">
    <div
        class="card"
        style="border: none; border-radius: 30px; box-shadow: 0px 2px 10px grey">
        <h4 id="title" class="ml-4 mt-2">
            <!-- <b-button :to="{ name: 'home-screen' }" variant="light">
                <i class="bi bi-arrow-left"></i>
            </b-button> -->
            Detail Data
        </h4>
        <div class="card-body">
            <b-list-group>
                <b-list-group-item>
                    <b>Name:</b> {{ TDL.name }}
                </b-list-group-item>
                <b-list-group-item>
                    <b>Created_at:</b> {{ TDL.created_at }}
                </b-list-group-item>
                <b-list-group-item class="">
                    <b>Description:</b> {{ TDL.description }}
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>
<script>
import { db } from "@/firebaseDb";
export default {
    name: "detail-data",
    data() {
        return {
            ToDo_List: [],
            TDL: {
                name: "",
                description: "",
                created_at: "",
            },
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
};
</script>