<template>
    <v-overlay :absolute="absolute" :value="overlay" class="z-index-overlay" opacity="0.3">
        <div class="container-progress">
           

            <v-img class="img-progress" id="svg" src="/gifs/load.gif"></v-img>

        </div>
    </v-overlay>
</template>

<script>
export default {
    name:'loading-progress',
    data() {
        return {
            absolute: false,
            overlay: false,
        };
    },
    methods: {
        show() {
            this.overlay = true;
        },
        hide() {
            this.overlay = false;
        },
    },
};
</script>

<style>
.z-index-overlay {
    z-index: 20000;
}

.container-progress {
    width: 100px;
    height: 100px;
}

.conic-gradient {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: conic-gradient(from 0deg, rgba(29, 92, 255, 0.11), #000);
}

.img-progress {
    position: absolute;
    z-index: 10;
    background: #fff;

    border-radius: 50%;
    margin: 0 auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
}

@-webkit-keyframes rotating

/* Safari and Chrome */
    {
    from {
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    to {
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes rotating {
    from {
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    to {
        -ms-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

.rotating {
    -webkit-animation: rotating 0.7s linear infinite;
    -moz-animation: rotating 0.7s linear infinite;
    -ms-animation: rotating 0.7s linear infinite;
    -o-animation: rotating 0.7s linear infinite;
    animation: rotating 0.7s linear infinite;
}
</style>