import { auth } from './firebase.js';

export function makeHeader() {
    const html = /*html*/ `
        <header>
            <h1>Books</h1>
        </header>
    `;

    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

// headerContainer.appendChild(dom);

export function makeProfile(user) {
    const html = /*html*/ `
        <div class="profile">
            <img src="${user.photoURL}">
            <span>${user.displayName}</span>
            <button>Sign out</button>
        </div>
    `;

    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

const headerContainer = document.getElementById('header-container');

export default function loadHeader(options) {
    const dom = makeHeader();
    //we must reference elements before adding dom to the parent via appendChild
    const header = dom.querySelector('header');
    headerContainer.appendChild(dom);

    if(options && options.skipAuth) {
        return;
    }

    auth.onAuthStateChanged(user => {
        if(user) {
            //there is a user
            const userDom = makeProfile(user);
            //reference elements before appending dom
            const signOutButton = userDom.querySelector('button');
            signOutButton.addEventListener('click', () => {
                auth.signOut();
            });
            header.appendChild(userDom);
        }
        else {
            // no user
            window.location = './auth.html';
            console.log('no user, connect to auth.html');
        }
    });
}