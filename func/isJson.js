function isJson(res) {
    try {
        JSON.parse(res);
    } catch (e) {
        return false;
    }
    return true;
}