const { fin } = window;
const uuid = fin.me.identity.uuid;
const mainWindowName = 'main-window';

const snapshotKey = 'platformSnapshot';

export default {
    async saveWorkspace() {
        let snapshot = await fin.Platform.getCurrentSync().getSnapshot();

        // TODO: replace this with a fetch() POST
        localStorage.setItem(snapshotKey, JSON.stringify(snapshot));
    },
    async restoreWorkspace() {
        //TODO: replace this with a fetch() GET
        let snapshot = JSON.parse(localStorage.getItem(snapshotKey));

        console.log('apply', snapshot);

        if(snapshot) {
            await fin.Platform.getCurrentSync().applySnapshot(snapshot, {
                closeExistingWindows: true 
            });
        }
        else {
            let mainWindow = fin.Window.wrapSync({uuid, name: mainWindowName });
            await mainWindow.hide();
            await mainWindow.resizeTo(1300, 900);
            await mainWindow.center();
            await mainWindow.updateOptions({ defaultCentered: false });
            console.log('updatedOptions', )
            await mainWindow.show();
        }
    },
    async createComponent(url) {
        fin.Platform.getCurrentSync().createWindow({
            url: (new URL('/platform/group-window', location.href)).href,
            defaultWidth: 800,
            defaultHeight: 600,
            layout: {
                settings: {
                    hasHeaders: true,
                    reorderEnabled: true
                },
                content: [
                    {
                        type: 'stack',
                        id: 'no-drop-target',
                        content: [
                            {
                                type: 'component',
                                componentName: 'view',
                                componentState: {
                                    url
                                }
                            }
                        ]
                    }
                ]
            }
        });
    },
    async createTab(url) {
        fin.Platform.getCurrentSync().createView({
            url
        });
    },
    async initViewContainer(layoutContainer) {
        if(fin) {
            let currentWindow = fin.Window.getCurrentSync();

            currentWindow.addListener('layout-ready', async () => {
                let views = await currentWindow.getCurrentViews();
                if(views.length === 1) {
                    let view = views[0];

                    let onTitleChanged = function(evt) {
                        const titleChangeEvent = new CustomEvent('content-title-changed', { 
                            detail: evt.title
                        });
                        layoutContainer.dispatchEvent(titleChangeEvent);
                    }

                    view.addListener('page-title-updated', onTitleChanged);

                    let info = await view.getInfo();
                    onTitleChanged(info);

                    view.addListener('resource-response-received', evt => {
                        if(evt.resourceType === "mainFrame" && evt.httpResponseCode === 200) {
                            const navigatedEvent = new CustomEvent('content-navigated', {
                                detail: evt
                            });
                            layoutContainer.dispatchEvent(navigatedEvent);
                        }
                    });
                }
            });

            fin.Platform.Layout.init({ containerId: layoutContainer.id });
        }
    }
}