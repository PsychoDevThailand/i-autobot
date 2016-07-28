var report_msg = 'Please tell us why do you want to report this page:';
var start_click = 1;
var end_click = 14;

function report_page(a, b, c) {
    var e = prompt(report_msg);
    if (e) {
        $.ajax({
            type: "POST",
            url: "system/ajax.php",
            data: {
                a: 'reportPage',
                id: a,
                url: b,
                module: c,
                reason: e
            },
            dataType: 'json',
            success: function(d) {
                if (d.type === 'success') {
                    skipuser(a, '1')
                }
                alert(d.message)
            }
        })
    }
}
var hideref = '';

function click_refresh() {
    if (start_click < end_click) {
        start_click = start_click + 1
    } else {
        location.reload(true)
    }
}

function skipuser(b, d) {
    $("#Hint").html("<img src=\"img/loader.gif\" /><br>");
    $.ajax({
        type: "POST",
        url: "system/modules/facebook/process.php",
        data: {
            step: 'skip',
            sid: b
        },
        success: function(a) {
            $("#Hint").html(a);
            clickskip(b, d);
            remove(b);
            click_refresh()
        }
    })
}
var targetWin;

function getRandomPosition(a, b) {
    return parseFloat(Math.random() * (b - a) + a).toFixed(2)
}

function ModulePopup(d, e, f) {
    // alert("open Module");
    console.log("first param" + d);
    console.log("second param" + e);
    console.log("third param" + f);
    console.log("Target: " + targetWin);
    // if (!targetWin || targetWin.closed) {
    //     $("#Hint").html("<img src=\"img/loader.gif\" /><br />");
    //     var j = (screen.width / 1.9) - (screen.width / getRandomPosition(3, 4));
    //     var k = (screen.height / 1.9) - (screen.height / getRandomPosition(3, 4));
    //     var l = hideref + e;
    //     $.ajax({
    //         type: "POST",
    //         url: "system/modules/facebook/process.php",
    //         data: {
    //             get: 1,
    //             url: e,
    //             pid: d
    //         },
    //         dataType: 'json',
    //         success: function(a) {
    //             if (a.type === 'success') {
    //                 clickready(d, e, f);
    //                 var b = setTimeout(function() {
    //                     targetWin.close();
    //                     windowclose()
    //                 }, 30000);
    //                 var c = setInterval(function() {
    //                     if (targetWin.closed) {
    //                         clearTimeout(c);
    //                         clearTimeout(b);
    //                         $("#Hint").html("<img src=\"img/loader.gif\" /><br>");
    //                         setTimeout(function() {
    //                             do_click(d)
    //                         }, 500)
    //                     }
    //                 }, 500)
    //             }
    //             $("#Hint").html(a.message)
    //         }
    //     });
    //     targetWin = window.open(l, f, "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=" + screen.width / 1.9 + ", height=" + screen.height / 1.9 + ", top=" + k + ", left=" + j)
    // }
}

function do_click(b) {
    $.ajax({
        type: "POST",
        url: "system/modules/facebook/process.php",
        data: {
            type: 1,
            id: b
        },
        dataType: 'json',
        success: function(a) {
            switch (a.type) {
                case 'success':
                    remove(b);
                    click_refresh();
                    clickdone(a.cpc);
                    break;
                case 'not_available':
                    remove(b);
                    break;
                case 'no_coin':
                    remove(b);
                    clickdone(a.cpc);
                    break;
                case 'unlike':
                    remove(b);
                    clickunlike(a.cpc);
                    break;
                case 'spam':
                    clickspam(a.cpc);
                    break;
                case 'error':
                    clickfail();
                    break
            }
            $("#Hint").html(a.message)
        }
    })
}

function remove(a) {
    $('#' + a).hide()
}
