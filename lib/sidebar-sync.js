'use babel';

function isTreeViewOpen() {
    var panelView, treeView, treeViewPkg;

    if (!(atom.packages.isPackageLoaded('tree-view') && atom.packages.isPackageActive('tree-view'))) {
        return false;
    }

    treeViewPkg = atom.packages.getActivePackage('tree-view');
    treeView = treeViewPkg.mainModule.treeView;

    if (!(treeView && treeView.panel)) {
        return false;
    }

    panelView = atom.views.getView(treeView.panel);

    if (panelView.parentNode == null) {
        return false;
    }

    return true;
}

export default {

    observer: null,

    activate: function() {
        if (!this.observer) {
            this.observer = atom.workspace.onDidChangeActivePaneItem(function(e) {
                var workspaceView, activePane;

                if(isTreeViewOpen()) {
                    workspaceView = atom.views.getView(atom.workspace);
                    activePane = atom.workspace.getActivePane();

                    if(activePane.activeItem && !activePane.activeItem.uri) {
                        setTimeout(function() {
                            atom.commands.dispatch(workspaceView, 'tree-view:reveal-active-file');
                            activePane.activate();
                        }, 500);
                    }
                }
            });
        }
    },

    deactivate: function() {
        if(this.observer) {
            this.observer.dispose();
            this.observer = null;
        }
    }

};
