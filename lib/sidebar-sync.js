'use babel';

export default {

    observer: null,

    activate: function() {
        if (!this.observer) {
            this.observer = atom.workspace.onDidChangeActivePaneItem(function(e) {
                var workspaceView, activePane;

                workspaceView = atom.views.getView(atom.workspace);
                activePane = atom.workspace.getActivePane();

                if (activePane.activeItem && !activePane.activeItem.uri) {
                    setTimeout(function() {
                        atom.commands.dispatch(workspaceView, 'tree-view:reveal-active-file');
                    }, 500);

                    activePane.activate();                    
                }
            });
        }
    },

    deactivate: function() {
        if (this.observer) {
            this.observer.dispose();
            this.observer = null;
        }
    }

};
