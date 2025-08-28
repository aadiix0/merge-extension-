
/* background script:
   - updates badge count
   - starts the viewer tab
*/

browser.browserAction.onClicked.addListener(tab => {

    // start viewer tab
    var url = browser.runtime.getURL('maintab.html#'+tab.id);
    browser.tabs.create({url:url});
});

function tab_updated(tab) {
    // console.log('active tab: '+tab.id);

    if (!get_config("tooltip"))
        return;

    // ask counts from content script
    browser.tabs.sendMessage(tab.id, {"badge":1}, reply => {
        update_badge(reply);
    });
}

// tab activity - update badge
browser.tabs.onActivated.addListener(info => {
    browser.tabs.get(info.tabId, tab => {
        tab_updated(tab);
    });
});
browser.tabs.onUpdated.addListener((tabid, info, tab) => {
    if (info.status == "complete")
        tab_updated(tab);
});

// console.log('bg loaded');
