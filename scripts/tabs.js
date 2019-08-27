let tabContentClass = "tabcontent";
let tabClass = "tab";
let tabLinksClass = "tablinks";
let activeClass = "active";
let createdClass = "created";
let closeTabClass = "closeTab";
let defaultOpenClass = "defaultOpen";
let isLocalhostId = "isLocalhost";
let OnTabHoverClass = "on-tab-hover";
var Title = null;
var lastTab = null;

startup();

function startup() {
    Title = document.title;
    injectCSS('./style/iframeMaxSize.css');
    injectCSS('./style/tabs.css');
    for (const tab of document.getElementsByClassName(tabClass)) {
        tab.appendChild(createCloseButton());
        // Get the element with id="defaultOpen" and click on it
        var def = tab.getElementsByClassName(defaultOpenClass)[0];
        if(def !== null){
            def.click();
        }
    }
}

function createCloseButton() {
    var btn = document.createElement("button");
    btn.classList.add(closeTabClass);
    btn.addEventListener("click", closeTab);
    btn.innerText = "X";
    return btn;
}

function createTabHeader(container) {
    var bar = document.createElement("div");
    bar.classList.add(tabClass);
    bar.appendChild(createCloseButton());
    var chk = document.createElement("input");
    chk.type="checkbox";
    chk.id=isLocalhostId;
    chk.title="On Localhost Network";
    chk.classList.add(OnTabHoverClass);
    bar.appendChild(chk);
    container.appendChild(bar);
    return {
        localhostCheckbox : document.getElementById(isLocalhostId),
        insertTab : (id, url, text, isDefault) => insertTab(bar, id, url(true), url(false), text, isDefault),
        start: (openFirst) => {
            if(openFirst){
                bar.getElementsByClassName(tabLinksClass)[0].click();
            }
        }
    };
}

function insertTab(bar, id, localUrl, url, text, isDefault) {
    var btn = document.createElement("button");
    btn.classList.add(tabLinksClass);
    if(isDefault){
        btn.classList.add(defaultOpenClass);
    }
    btn.addEventListener("click",() => createTab(btn, id, document.getElementById(isLocalhostId).checked ? localUrl : url));
    btn.innerText=text;
    bar.appendChild(btn);
}

function injectCSS(path){
    InjectInHead(path, () => {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = path;
        return link;
    });
}

function injectJS(path){
    InjectInHead(path, () => {
        var script = document.createElement('link');
        script.type = 'text/javascript';
        script.src = path;
        return script;
    });
}

function InjectInHead(path, func) {
    var id = path.split("/").pop().split(".")[0];
    if (!document.getElementById(id)) {
        var head = document.querySelector("head");
        var elem = func();
        elem.id = id;
        head.appendChild(elem);
    }
}

function createTab(element, tabName, address) {
    // Get all elements with class="tabcontent" and hide them
    var tabcontent = document.getElementById(tabName);

    if (tabcontent === null) {
        var div = document.createElement("div");
        div.id = tabName;
        div.classList.add(tabContentClass, "h_iframe");
        var frame = document.createElement("iframe");
        frame.src = address;
        frame.allowFullscreen = true;
        frame.referrerPolicy = "no-referrer";
        div.appendChild(frame);
        element.parentElement.parentElement.appendChild(div)
        element.classList.add(createdClass);
        element.addEventListener("dblclick", function () {
            window.open(address, '_blank');
        });
    }

    openTab(element, tabName)
}

function openTab(element, tabName) {
    // Get all elements with class="tabcontent" and hide them
    for (const tabcontent of document.getElementsByClassName(tabContentClass)) {
        tabcontent.style.display = "none";
    }

    deselectTabs();
    // Add an "active" class to the button that opened the tab
    element.classList.add(activeClass);

    // Show the current tab
    lastTab = document.getElementById(tabName);
    lastTab.style.display = "block";

    for (const closeBtn of document.getElementsByClassName(closeTabClass)) {
        closeBtn.style.display = "block";
    }

    document.title = element.innerHTML;
}

function deselectTabs() {
    // Get all elements with class="tablinks" and remove the class "active"
    for (const tablink of document.getElementsByClassName(tabLinksClass)) {
        tablink.classList.remove(activeClass);
    }
}

function closeTab() {
    if (lastTab === null) {
        return;
    }
    lastTab.parentElement.removeChild(lastTab);
    for (const tab of document.getElementsByClassName(tabClass)) {
        for (const btn of tab.getElementsByTagName("button")) {
            if (btn.classList.contains(activeClass)) {
                btn.classList.remove(createdClass);
            }
        }
    }
    lastTab = null;
    deselectTabs();

    for (const closeBtn of document.getElementsByClassName(closeTabClass)) {
        closeBtn.style.display = "none";
    }

    document.title = Title;
}