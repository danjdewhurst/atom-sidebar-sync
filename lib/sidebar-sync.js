'use babel';

export default {

    observer: null,

    activate: function() {
        var justActivated = false;

        if(!this.observer) {
            this.observer = atom.workspace.onDidChangeActivePaneItem(function(e) {
                if(justActivated) {
                    justActivated = false;

                    return;
                }

                var workspaceView, activePane;

                workspaceView = atom.views.getView(atom.workspace);
                activePane = atom.workspace.getActivePane();

                setTimeout(function() {
                    atom.commands.dispatch(workspaceView, 'tree-view:reveal-active-file');
                    activePane.activate();
                    justActivated = true;
                }, 500);
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
