<template>
<div class="titleBar">
    <div class="factsetIconWrapper"><div class="icon factset" /></div>
    <div class="dragArea">{{ title }}</div>
    <ControlBox v-bind:maximized="maximized" @onClose="close" @onMaximize="maximize" @onMinimize="minimize" @onRestore="restore"/>
</div>
</template>

<script>
import ControlBox from './ControlBox.vue';

export default {
    props: {
        title: String,
        maximized: Boolean
    },
    components: {
        ControlBox
    },
    methods: {
        close() {
            this.$emit('onClose');
        },
        maximize() {
            this.$emit('onMaximize');
        },
        minimize() {
            this.$emit('onMinimize');
        },
        restore() {
            this.$emit('onRestore');
        }
    },
    mounted() {
        console.log(this);
    }
}
</script>

<style scoped>
    .titleBar {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        display: flex;
        align-items: center;
        height: var(--title-bar-height);
        background-color: var(--title-bar-background-color);
        border-bottom: 1px solid rgb(250,250,250);
        padding: 0px 6px 0px 6px;
        user-select: none;
    }

    .factsetIconWrapper {
        display: flex;
        margin-right: 8px;
    }

    .dragArea {
        display: flex;
        flex-grow: 1;
        flex-shrink: 1;
        -webkit-app-region: drag;
    }

    .icon.factset {
        background-position-x: -376px;
        background-position-y: -126px;
        height: 16px;
        width: 16px;
        background-color: rgb(0,45,86);
    }
</style>