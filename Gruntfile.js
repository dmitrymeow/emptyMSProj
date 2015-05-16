module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			main: {
				src: 'src/js/libs/*.js',
				dest: 'prod/js/lib.js'
			}
		},

		uglify: {
			main: {
				files: {
					'prod/js/lib.min.js': '<%= concat.main.dest %>'
				}
			}
		},

		compass: {
			dist: {
				options: {
					sassDir: 'src/sass',
					cssDir: 'prod/css',
					raw: 'output_style = :compact\nline_comments = false'
				}
			}
		},

		autoprefixer: {
			multiple_files: {
				// browsers: [''],
				browsers: ['last 4 version, > 5%', 'ie 7', 'ie 8', 'ie 9'],
				expand: true,
				cwd: 'prod/css',
				src: '*.css',
				dest: 'prod/css'
			},
		},

		sync: {
			main: {
				files: [
					{ cwd: 'src/js', src: '*.js', dest: 'prod/js' },
					{ cwd: 'src/images', src: '**/*.*', dest: 'prod/images' },
					{ cwd: 'src/sass', src: ['**/*.*', '!**/*.scss'], dest: 'prod/css' },
					{ cwd: 'src/', src: ['*.*', '!*.jade'], dest: 'prod/' }
				],
				pretend: false,
				verbose: true,
				expand: true
			}
		},

		jade: {
			compile: {
				options: {
					client: false,
					pretty: true
				},
				files: [ {
					cwd: "src",
					src: "*.jade",
					dest: "prod",
					expand: true,
					ext: ".html"
				} ]
			}
		},

		prettify: {
			options: {
				indent_char: ' ',
				indent: 4,
				unformatted: [
					'a',
					'code',
					'pre'
					]
			},
			all: {
				expand: true,
				cwd: 'prod/',
				ext: '.html',
				src: ['**/*.html'],
				dest: 'prod/'
			}
		},

		watch: {
			concat: {
				files: ['src/js/libs/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false
				}
			},
			sync: {
				files: ['src/js/*.js', 'src/images/**/*.*', 'src/sass/**/*.*', 'src/*.*', '!src/*.jade', '!src/sass/**/*.scss'],
				tasks: ['sync'],
				options: {
					spawn: false
				}
			},
			compass: {
				files: ['src/sass/**/*.scss'],
				tasks: ['compass'],
				options: {
					spawn: false
				}
			},
			jade: {
				files: ['src/**/*.jade'],
				tasks: ['jade'],
				options: {
					spawn: false
				}
			}
		}

    });

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-sync');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-prettify');

	grunt.registerTask('default', ['concat', 'uglify', 'compass', 'sync', 'autoprefixer', 'jade', 'prettify']);
	grunt.registerTask('prefix', ['autoprefixer']);
	grunt.registerTask('dev', ['watch']);
};