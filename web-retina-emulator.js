(function (window, location) {

    function upperCaseFirst(str) {
        str += '';
        var first = str.charAt(0).toUpperCase();
        return first + str.substr(1);
    }

    var prefixes = "Webkit Moz Khtml O ms Icab".split(" ");

    var getVendorPrefix = function () {
        var prefix = "";
        var testStyle = "Transform";
        var bodyStyle = document.body.style;

        for (var i = 0, l = prefixes.length; i < l; i++) {
            if (bodyStyle[prefixes[i]+testStyle] !== void 0) {
                return prefixes[i];
            }
        }

        return prefix;
    };

    var retinaStyles = {
        "transform": "scale(2)",
        "transformOrigin": "0 0"
    };

    var nonRetinaStyles = {
        "transform": "",
        "transformOrigin": ""
    };

    function toggleRetinaEmulation() {
        var prefix = getVendorPrefix();
        var bodyStyle = document.body.style;
        var styles;
        var prefixedKey;

        if (window.devicePixelRatio > 1) {
            styles = nonRetinaStyles;
            window.devicePixelRatio = 1;
        }
        else {
            styles = retinaStyles;
            window.devicePixelRatio = 2;
        }

        for (var key in styles) {
            prefixedKey = prefix ? prefix + upperCaseFirst(key) : key;
            bodyStyle[prefixedKey] = styles[key];
        }
    }

    /**
     * Firefox doesn't allow common browser JS objects like window and
     * setInterval if this code is copy-pasted into the URL. If this is false,
     * we gotta bail and let them know
     */
    if (!this.setInterval) {
        return "Can't copy paste this. https://bugzilla.mozilla.org/show_bug.cgi?id=527530";
    }

    var handle = setInterval(function() {
        if (document.body) {
            clearInterval(handle);
            toggleRetinaEmulation();
        }
    }, 10);

})(window, location);