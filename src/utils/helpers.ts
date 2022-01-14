import { createGlobalState, useDark } from "@vueuse/core";

export const generateHTML = (
  payload: Record<string, any>,
  isDark?: boolean
) => {
  return `<html class="${isDark ? "dark" : ""}">
        <head>
            <style id="_style">${payload.css}</style>
            <script type="module" id="_script">
                ${payload.javascript}

                window.addEventListener('message', function(event) {
                    console.log(event)
                    if (event.data === 'theme-dark') {
                        document.documentElement.classList.add('dark')
                    } else if (event.data === 'theme-light') {
                        document.documentElement.classList.remove('dark')
                    }
                })
            </\script>
        </head>
        <body>
            ${payload.html}
        </body>
    </html`;
};

export const useDarkGlobal = createGlobalState(() => useDark());

export const initialEditorValue = {
  html: `<script src="https://cdn.tailwindcss.com"></script>
    <div id="app">
        <div class="post mb-2 border-b py-5 border-gray-300" v-for="(post, index) in posts" :key="index">
            <div class="mt-2">
                <a href="#" class="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline text-capitalize" v-text="post.title"></a>
                <p class="mt-2 text-gray-600 dark:text-gray-300" v-text="post.body"></p>
            </div>
            
            <div class="flex items-center justify-between mt-4">
                <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">Read more</a>
            </div>
        </div>
    </div>`,
  javascript: `import Vue from 'https://unpkg.com/vue@2.6.14/dist/vue.esm.browser.min.js'
new Vue({
    el: "#app",
    data(){
        return {
            posts: []
        }
    },
    mounted(){
        fetch('https://jsonplaceholder.typicode.com/posts/')
            .then(response => response.json())
            .then(posts => this.posts = posts);
    }
})`,
  css: ``,
};
