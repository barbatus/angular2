System.config({
    packages: {
        'angular2': {
            main: 'main',
            format: 'register',
            map: {
                '.': System.normalizeSync('{barbatus:angular2}')
            }
        }
    }
});
