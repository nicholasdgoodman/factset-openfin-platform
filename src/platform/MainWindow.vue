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

import TitleBar from './TitleBar.vue';
import ofUtils from './utils';

export default {
    components: {
        TitleBar
    },
    methods: {
        async close() {
            if(!window.location.hostname.includes('login')) {
                await ofUtils.saveWorkspace();
            }
            fin.Platform.getCurrentSync().quit();
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
        let me = this;
        let layoutContainer = this.$refs.layoutContainer;

        layoutContainer.addEventListener('content-title-changed', ({ detail: title }) => {
            me.title = title;
        });

        //HACK: Crude login detection logic!
        layoutContainer.addEventListener('content-navigated', ({ detail: evt}) => {
            let originalUrl = new URL(evt.originalUrl);
            let newUrl = new URL(evt.newUrl);

            if(originalUrl.hostname.startsWith('login') && originalUrl.hostname.endsWith('factset.com') &&
                newUrl.hostname.startsWith('my') && newUrl.host.endsWith('factset.com')) {
                ofUtils.restoreWorkspace();
            }
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