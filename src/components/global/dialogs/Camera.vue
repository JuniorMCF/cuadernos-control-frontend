<template>

    <v-dialog opacity="0.3" v-model="dialog" :max-width="options.width" :style="{ zIndex: options.zIndex }"
        @keydown.esc="cancel" persistent>
        <v-card class="rounded-lg">
            <v-card-text class="pa-5 d-flex">
                <v-toolbar-title class="text-truncate">
                    <span class="title font-weight-bold black--text text-truncate">
                        {{ title }}
                    </span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn small fab text class="rounded-circle w-10" @click="dialog = !dialog">
                    <v-icon class="rounded-circle"> mdi-close </v-icon>
                </v-btn>

            </v-card-text>
            <v-divider class="mb-2 ma-0"></v-divider>

            <v-card-text>
                <v-file-input accept="image/*" type="file" @change="uploadFile" ref="file" :label="title">

                </v-file-input>
            </v-card-text>
            <v-divider class="mt-2 ma-0"></v-divider>
            <v-card-actions class="pa-5">
                <v-spacer></v-spacer>
                <v-btn color="primary" class="body-2 font-weight-bold rounded-lg elevation-0 text-normal" large
                    :loading="load" @click="submitFile">Actualizar foto</v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>

</template>

<script>
export default {
    name: 'CirculosCamera',

    data() {
        return {
            id: null,
            title: "",
            images: null,
            dialog: false,
            resolve: null,
            reject: null,
            load: false,
            options: {
                color: "primary",
                width: 600,
                zIndex: 200,
                noconfirm: false,
            },
            path: '',

        };
    },

    mounted() {

    },

    methods: {
        open(title, path, id,options) {
            this.dialog = true;
            this.title = title
            this.path = path
            this.id = id
            this.options = Object.assign(this.options, options);
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
        agree() {
            this.resolve(true);
            this.dialog = false;
        },
        cancel() {
            this.resolve(false);
             this.image = null
            this.dialog = false;
        },
        uploadFile(e) {
           
            this.images = e
        },
        submitFile() {
            this.load = true
            const formData = new FormData();
            
            formData.append('file', this.images);
            formData.append('id', this.id)


            const config = {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.getters["auth/getToken"],
                    'Content-Type': 'multipart/form-data'
                }
            }

            this.$axios.post(this.path, formData, config).then((res) => {
                res.data.files; // binary representation of the file
                res.status; // HTTP status
                this.resolve(true)
                this.load = false
                this.dialog = false;
                this.image = null
            }).catch(err => {
                console.log(err)
                this.load = false
                this.resolve(false)
            });
        }
    },
};
</script>

<style lang="scss" scoped>
</style>