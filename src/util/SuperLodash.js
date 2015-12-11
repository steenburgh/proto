import _ from "lodash";

_.mixin({
  makeId (len) {
    len = len || 8;

    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let text = "";
    let i;

    for (i = 0; i < len; i++) {
      text = text + possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  },
});
