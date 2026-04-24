/**
 * PocketFM - A 50KB Lightweight File Manager
 * Handles navigation, previewing, and basic file ops.
 */

const FM = {
    currentPath: '/',
    files: [],
    config: {
        apiBase: '/api/files', // Replace with your backend endpoint
        rootElement: '#fm-app'
    },

    init() {
        this.renderLayout();
        this.fetchFiles();
        this.attachListeners();
    },

    async fetchFiles(path = this.currentPath) {
        try {
            // In a real app, you'd fetch from your server: 
            // const res = await fetch(`${this.config.apiBase}?path=${path}`);
            // this.files = await res.json();
            
            // Mock data for demonstration
            this.files = [
                { name: 'Documents', type: 'dir', size: '-' },
                { name: 'App.js', type: 'file', size: '12 KB' },
                { name: 'Logo.png', type: 'file', size: '1.2 MB' }
            ];
            this.renderList();
        } catch (err) {
            console.error("Failed to load files", err);
        }
    },

    renderLayout() {
        const app = document.querySelector(this.config.rootElement);
        app.innerHTML = `
            <div class="fm-container">
                <header class="fm-toolbar">
                    <button id="back-btn">⬅ Back</button>
                    <span id="current-path">${this.currentPath}</span>
                    <input type="file" id="upload-input" style="display:none">
                    <button onclick="document.getElementById('upload-input').click()">Upload</button>
                </header>
                <div class="fm-grid" id="fm-list"></div>
            </div>
        `;
    },

    renderList() {
        const list = document.getElementById('fm-list');
        list.innerHTML = this.files.map(file => `
            <div class="fm-item" data-name="${file.name}" data-type="${file.type}">
                <div class="icon">${file.type === 'dir' ? '📁' : '📄'}</div>
                <div class="name">${file.name}</div>
                <div class="size">${file.size}</div>
            </div>
        `).join('');
    },

    attachListeners() {
        document.getElementById('fm-list').addEventListener('click', (e) => {
            const item = e.target.closest('.fm-item');
            if (!item) return;
            
            const { name, type } = item.dataset;
            if (type === 'dir') {
                this.currentPath += `${name}/`;
                this.fetchFiles(this.currentPath);
            } else {
                alert(`Opening file: ${name}`);
            }
        });
    }
};

FM.init();