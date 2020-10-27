<template>
    <div id="of-frame-main" class="windowFrame">
        <TitleBar v-bind:title="title" v-bind:maximized="maximized" @onClose="close" @onMaximize="maximize" @onMinimize="minimize" @onRestore="restore"/>
        <div id="body-container" class="contentBody">
            <div id="layout-container" ref="layoutContainer">{{ altText }}</div>
        </div>
    </div>
</template>

<script>
const { fin } = window;

import Vue from 'vue';
import TitleBar from './TitleBar.vue';
import ChannelSelectorButton from './ChannelSelectorButton.vue'
import ofUtils from './utils';

export default {
    components: {
        TitleBar
    },
    methods: {
        async close() {
            fin.me.close();
        },
        maximize() {
            fin.me.maximize();
            this.maximized = true;
        },
        minimize() {
            fin.me.minimize();
        },
        restore() {
            fin.me.restore();
            this.maximized = false;
        }
    },
    data() {
        return {
            title: 'Factset',
            maximized: false,
            altText: fin ? undefined : 'Not supported in browser'
        }
    },
    mounted() {
        let layoutContainer = this.$refs.layoutContainer;

        layoutContainer.addEventListener('tab-created', ({ detail: evt }) => {
            let { tabSelector } = evt;
            let insertPoint = document.querySelector(`#${tabSelector} .lm_left`);

            new Vue({
                el: insertPoint,
                render: h => h(ChannelSelectorButton)
            })
        });

        ofUtils.initViewContainer(layoutContainer);
    }
}
</script>

<style scoped>
.windowFrame {
    border: 1px solid lightgray;
}
</style>

<style>
:root {
    --title-bar-height: 25px;
}
</style>