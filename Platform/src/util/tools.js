layui.define(['jquery'], function (exports) {
    var $ = layui.jquery;

    /**
     *  清空表单
     *  @param { Object } formObj 表单对象
     *  @param { String } filter 表单过滤
     *  @param { Arrary } clearKeys 清空的值
     */
    function resetFrom(formObj, filter, clearKeys) {
        var keyValue = {};

        for (var k in clearKeys) {
            var key = clearKeys[k];
            keyValue[key] = ''
        }

        formObj.val(filter, keyValue);
        formObj.render();
    }

    exports('tools', {
        "resetFrom": resetFrom, // 清空表单
    })
});