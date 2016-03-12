/**
 * Created by hxghxg527 on 16/3/4.
 */
'use strict';

$(document).ready(function () {
    var goTop = new GoTop();
    addEventForFooterMenu();
    var carousel = new Carousel();
});

function addEventForFooterMenu() {
    var container = $('.footer-container .footer-search-inner-container .type-container'),
        span_elem = container.find('span'),
        all_type = container.find('.all-type');

    container.bind('mouseover', function () {
        all_type.show();
    }).bind('mouseout', function () {
        all_type.hide();
    });

    all_type.find('li').bind('click', function () {
        span_elem.text($(this).text());
        all_type.hide();
    });
}