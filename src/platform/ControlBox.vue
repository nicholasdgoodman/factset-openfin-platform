<template>
    <div class="controlBox">
        <svg v-on:click="minimize" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="controlBoxControl"><path d="M64 53H0V63.514H64V53Z" class="path_fYnm689c"></path></svg>
        <svg v-if="!maximized" v-on:click="maximize" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="controlBoxControl"><path d="M0 4V59.4H64V4H0ZM58.7 54.1H5.3V18.7H58.6V54.1H58.7Z" class="path_1DcTrxlP"></path></svg>
        <svg v-if="maximized" v-on:click="restore" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="controlBoxControl"><path d="M18.243 3V21.243H0V60.82H45.757V42.577H64V3H18.243ZM41.969 57.032H3.788V31.711H18.243H22.031H41.969V38.789V42.577V57.032V57.032ZM60.212 38.788H45.757V21.243H22.031V13.467H60.112V38.788H60.212Z" class="path_2LkE8D_f"></path></svg>
        <svg v-on:click="close" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="controlBoxControl"><path d="M32 24.9L7.1 0L0 7.1L24.9 32L0 56.9L7.1 64L32 39.1L56.9 64L64 56.9L39.1 32L64 7.1L56.9 0L32 24.9Z" class="path_7eS1VN4T"></path></svg>
    </div>
</template>

<script>
export default {
    props: {
        maximized: Boolean
    },
    methods: {
        close() {
            this.$emit('onClose');
        },
        minimize() {
            this.$emit('onMinimize');
        },
        maximize() {
            this.$emit('onMaximize');
        },
        restore() {
            this.$emit('onRestore');
        }
    }
}
</script>

<style scoped>
    .controlBox {
        display: flex;
    }

    .controlBoxControl {
        height: 12px;
        width: 12px;
        padding: 1px 3px 1px 3px;
        margin-left: 10px;
    }
</style>