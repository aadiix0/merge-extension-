var validateXML = (txt) => {
    // code for IE
    var cons = document.querySelector('.message');
    if (window.ActiveXObject) {
        var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(document.all(txt).value);

        if (xmlDoc.parseError.errorCode != 0) {
            txt = "Error Code: " + xmlDoc.parseError.errorCode + "\n";
            txt = txt + "Error Reason: " + xmlDoc.parseError.reason;
            txt = txt + "Error Line: " + xmlDoc.parseError.line;
            cons.textContent = txt;
        } else {
            cons.textContent = "No errors found";
        }
    }
    // code for Mozilla, Firefox, Opera, etc.
    else if (document.implementation.createDocument) {
        var parser = new DOMParser();
        // var text = document.getElementById(txt).value;
        var xmlDoc = parser.parseFromString(txt, "text/xml");
        if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
            checkErrorXML(xmlDoc.getElementsByTagName("parsererror")[0]);
            cons.textContent = xt;
        } else {
            cons.textContent = "No errors found";
        }
    } else {
        cons.textContent = 'Your browser cannot handle XML validation';
    }
}
var xt = "",
    h3OK = 1

function checkErrorXML(x) {
    xt = ""
    h3OK = 1
    checkXML(x)
}

var checkXML = (n) => {
    var l, i, nam
    nam = n.nodeName
    if (nam == "h3") {
        if (h3OK == 0) {
            return;
        }
        h3OK = 0
    }
    if (nam == "#text") {
        xt = xt + n.nodeValue + "\n"
    }
    l = n.childNodes.length
    for (i = 0; i < l; i++) {
        checkXML(n.childNodes[i])
    }
}

function functionAlert(msg, myYes) {
    var confirmBox = $("#confirm");
    confirmBox.find(".message").text(msg);
    confirmBox.find(".yes").unbind().click(function() {
        confirmBox.hide();
    });
    confirmBox.find(".yes").click(myYes);
    confirmBox.show();
}
