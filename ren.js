var locations = [
        '',
        '/Accreditation.html',
        '/AboutUs.html',
        '/Blog.html',
        '/Meet-The-Team.html',
        '/Contact-Us.html',
        '/Financial-Training-Corporate-Finance.html#!types=2&categories=14443,14459,14523,14479&sortType=6&page=1',
        '/Financial-Training/International_Financial_Reporting_Standards_(IFRS)/Main-Course.html?linkindexnumber=10',
        '/Tailored-Learning-Solutions.html',
        '/eLearning.html',
        '/e-library-training-solution.html',
        '/compliance-e-learning-solutions.html',
        '/custom-e-learning.html',
        '/Books.html',
        '/Project-Finance-in-Practice-3a-Case-Studies/7984/BookInfo.html',
        '/LD.html'
    ],
    evironments = [{
        'host': 'http://www.euromoneylearningsolutions.com',
        'code': 'live'
    }],
    sizes = [1200, 768, 480],
    evironmentIndex = undefined,
    sizeIndex = undefined,
    locIndex = undefined;

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function getFileNameFromUrl(url) {
    var res = url || '.home';
    res = res
        .replaceAll("/", '.').replaceAll("?", '.').replaceAll("&", '.').replaceAll("%", '.')
        .replaceAll("#", '.').replaceAll("#!", '.').replaceAll("=", '.').replaceAll(",", '.')
        .replaceAll("(", '.').replaceAll(")", '.')
        .replaceAll("..", '.').replaceAll("..", '.').replaceAll("..", '.').replaceAll("..", '.');
    return res;
}

function nextScrapp() {
    if (evironmentIndex === undefined && sizeIndex === undefined && locIndex === undefined) {
        evironmentIndex = 0;
        sizeIndex = 0;
        locIndex = 0;
    } else {
        sizeIndex++;
    }

    if (sizeIndex >= sizes.length) {
        sizeIndex = 0;
        evironmentIndex++;
    }

    if (evironmentIndex >= evironments.length) {
        evironmentIndex = 0;
        locIndex++;
    }

    if (locIndex < locations.length) {
        var environment = evironments[evironmentIndex],
            url = environment.host + locations[locIndex],
            fileName = environment.code + getFileNameFromUrl(locations[locIndex]),
            size = sizes[sizeIndex];

        console.log('scrapping: ' + url + ' ' + size);
        scrapp(url, fileName, size, function() {
            nextScrapp();
        })
    } else {
        phantom.exit();
    }
}

var page = require('webpage').create();

function scrapp(url, fileName, size, callback) {
    page.viewportSize = {
        width: size,
        height: 800
    };

    page.open(url, function() {
        page.render('./output/' + fileName + ' ' + size + '.png');
        if (callback) callback();
    });
};

nextScrapp();
