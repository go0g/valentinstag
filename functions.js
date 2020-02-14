const ich = [
    [20, 40, 60, 80, 100, 120, 140],
];
let ich_index = 0;

const liebe = [
     [20,40,60,80,100,120,140, 141,142],
     [20,40,60,80,100,120,140, 21,22, 141,142, 23,43,63,83,103,123,143],
     [20,40,60,80,100,120,141, 142, 23,43,63,83,103,123],
     [20,40,60,80,100,120,140, 21, 22, 81,82, 141,142]  
];
let liebe_index = 0;

const dich = [
    [20,40,60,80, 81,82, 23,43,63,83,103,123,143],
    [20,40,60,80,100,120,140, 21,22, 141,142, 23,43,63,83,103,123,143],
    [20,40,60,80,100,120,140, 141,142, 23,43,63,83,103,123,143]


]
let dich_index = 0;

let alles = ['ich', 'liebe', 'dich'];
let alles_index = 0;

function fitElementToParent(el, padding) {
    var timeout = null;

    function resize() {
        if (timeout) clearTimeout(timeout);
        anime.set(el, {
            scale: 1
        });
        var pad = padding || 0;
        var parentEl = el.parentNode;
        var elOffsetWidth = el.offsetWidth - pad;
        var parentOffsetWidth = parentEl.offsetWidth;
        var ratio = parentOffsetWidth / elOffsetWidth;
        timeout = setTimeout(anime.set(el, {
            scale: ratio
        }), 10);
    }
    resize();
    window.addEventListener('resize', resize);
}

var advancedStaggeringAnimation = (function () {

    var staggerVisualizerEl = document.querySelector('.stagger-visualizer');
    var dotsWrapperEl = staggerVisualizerEl.querySelector('.dots-wrapper');
    var dotsFragment = document.createDocumentFragment();
    var grid = [20, 10];
    var cell = 55;
    var numberOfElements = grid[0] * grid[1];
    var animation;
    var paused = true;

    fitElementToParent(staggerVisualizerEl, 0);

    for (var i = 0; i < numberOfElements; i++) {
        var dotEl = document.createElement('div');
        dotEl.id = i
        dotEl.classList.add('dot');
        dotsFragment.appendChild(dotEl);
    }

    dotsWrapperEl.appendChild(dotsFragment);

    var index = 110;
    var nextIndex = 110;

    anime.set('.stagger-visualizer .cursor', {
        translateX: anime.stagger(-cell, {
            grid: grid,
            from: index,
            axis: 'x'
        }),
        translateY: anime.stagger(-cell, {
            grid: grid,
            from: index,
            axis: 'y'
        }),
        translateZ: 0,
        scale: 1.5,
    });

    function play() {

        paused = false;
        if (animation) animation.pause();

        nextIndex = 110;

        animation = anime.timeline({
                easing: 'easeInOutQuad',
                complete: play
            })
            .add({
                targets: '.stagger-visualizer .cursor',
                keyframes: [{
                        scale: .75,
                        duration: 60
                    }, //120
                    {
                        scale: 2.5,
                        duration: 110
                    }, //220
                    {
                        scale: 1.5,
                        duration: 225
                    }, //450
                ],
                duration: 300
            })
            .add({
                targets: '.stagger-visualizer .dot',
                keyframes: [{
                    translateX: anime.stagger('-2px', {
                        grid: grid,
                        from: index,
                        axis: 'x'
                    }),
                    translateY: anime.stagger('-2px', {
                        grid: grid,
                        from: index,
                        axis: 'y'
                    }),
                    duration: 100 //100
                }, {
                    translateX: anime.stagger('4px', {
                        grid: grid,
                        from: index,
                        axis: 'x'
                    }),
                    translateY: anime.stagger('4px', {
                        grid: grid,
                        from: index,
                        axis: 'y'
                    }),
                    scale: anime.stagger([2.6, 1], {
                        grid: grid,
                        from: index
                    }),
                    duration: 120 //225
                }, {
                    translateX: 0,
                    translateY: 0,
                    scale: 1,
                    duration: 500, //500
                }],
                delay: anime.stagger(80, {
                    grid: grid,
                    from: index
                })
            }, 30)
            .add({
                targets: '.stagger-visualizer .cursor',
                translateX: {
                    value: anime.stagger(-cell, {
                        grid: grid,
                        from: nextIndex,
                        axis: 'x'
                    })
                },
                translateY: {
                    value: anime.stagger(-cell, {
                        grid: grid,
                        from: nextIndex,
                        axis: 'y'
                    })
                },
                scale: 1.5,
                easing: 'cubicBezier(.075, .2, .165, 1)'
            }, '-=800')

        switch (alles[alles_index]) {
            case 'ich':
                if (ich_index < ich.length) {
                    ich[ich_index].forEach(el => {
                        document.getElementById(el+10).classList.add('fillHeard')
                        // document.getElementById(el + 1).classList.add('fillHeard')
                    })
                    ich_index++
                } else {
                    document.querySelectorAll('.dot').forEach(el => el.classList.remove('fillHeard'));
                    ich_index = 0;
                    alles_index++;
                };
                break;
            case 'liebe':
                if (liebe_index < liebe.length) {
                    liebe[liebe_index].forEach((el) => {
                        document.getElementById(el + (liebe_index*5)+1).classList.add('fillHeard')                        
                    })
                    liebe_index++;
                } else {
                    document.querySelectorAll('.dot').forEach(el => el.classList.remove('fillHeard'));
                    liebe_index = 0;
                    alles_index++;
                };
                break;
            case 'dich':
                if (dich_index < dich.length) {
                    dich[dich_index].forEach(el => {
                        document.getElementById(el + (dich_index * 5)+4).classList.add('fillHeard');                        
                    })
                    dich_index++
                } else {
                    document.querySelectorAll('.dot').forEach(el => el.classList.remove('fillHeard'));
                    dich_index = 0;
                    alles_index = 0;
                };
                break;

        }

        index = nextIndex;

    }

    play();

})();
