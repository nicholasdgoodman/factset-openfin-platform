<template>
    <div>
        <div><button v-on:click="openChartComponent">Open Chart Component</button></div>
        <div><button v-on:click="openNewsComponent">Open News Component</button></div>
        <br/>
        <div><button v-on:click="openChartTab">Open Chart Tabbed</button></div>
        <div><button v-on:click="openNewsTab">Open News Tabbed</button></div>
    </div>
</template>

<script>
const { fin } = window;
import ofUtils from './utils';

const chartUrl = 'https://my.uat.factset.com/interactive-charting-cosec/ic-popup.html?envComm=true&uuid=' + fin.me.identity.uuid;
const newsUrl = 'https://my.uat.factset.com/news-headlines/?envComm=true&uuid=' + fin.me.identity.uuid;

export default {
    methods: {
        openChartComponent() {
            ofUtils.createComponent(chartUrl);
        },
        openNewsComponent() {
            ofUtils.createComponent(newsUrl);
        },
        openChartTab() {
            ofUtils.createTab(chartUrl);
        },
        openNewsTab() {
            ofUtils.createTab(newsUrl);
        }
    }
}
</script>

<style scoped>
button {
    width: 300px;
}
</style>