<template>
    <div id="of-frame-main" class="windowFrame">
        <div id="body-container" class="contentBody">
            <div id="layout-container" ref="layoutContainer">{{ altText }}</div>
        </div>
    </div>
</template>

<script>
const { fin } = window;

import Vue from 'vue';
import ControlBox from './ControlBox.vue';
import ChannelSelectorButton from './ChannelSelectorButton.vue'

export default {
    components: {
        
    },
    data() {
        return {
            altText: fin ? undefined : 'Not supported in browser'
        }
    },
    mounted() {
        //let me = this;
        let layoutContainer = this.$refs.layoutContainer;

        if(fin) {
            (async function() {
                layoutContainer.addEventListener('tab-created', ({ detail: evt }) => {
                    let { tabSelector } = evt;
                    let insertPoint = document.querySelector(`#${tabSelector} .lm_left`);

                    new Vue({
                        el: insertPoint,
                        render: h => h(ChannelSelectorButton)
                    });

                    let tab = document.getElementById(tabSelector);
                    let header = tab.closest('.lm_header');
                    let controls = header.querySelector('.lm_controls');

                    let controlBox = controls.querySelector('.controlBox');
                    if(controlBox === null) {
                        controlBox = document.createElement('li');
                        controls.appendChild(controlBox);

                        new Vue({
                            el: controlBox,
                            render: h => h(ControlBox)
                        });
                    }
                });

                await fin.Platform.Layout.init({ containerId: layoutContainer.id });
            })();
        }
    }
}
</script>

<style>
:root {
    --title-bar-height: 0px;
}

.lm_header .lm_tabs {
    padding-left: 26px;
    -webkit-app-region: drag;
}

.lm_tab {
    min-width: 160px;
}

.controlBox {
    fill: white;
    margin-top: 5px;
}

</style>