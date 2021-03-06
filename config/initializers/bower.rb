# Bower asset paths
Rails.root.join('vendor', 'assets', 'bower_components').to_s.tap do |bower_path|
  Rails.application.config.sass.load_paths << bower_path
  Rails.application.config.assets.paths << bower_path
end

# Precompile Bootstrap fonts
Rails.application.config.assets.precompile << %r(bootstrap-sass/assets/fonts/bootstrap/[\w-]+\.(?:eot|svg|ttf|woff2?)$)
# famfamfam images
Rails.application.config.assets.precompile << %r(famfamfam-(flags|silk)/img/[\w-]+\.(png)$)
# jstree
Rails.application.config.assets.precompile << %r(jstree/dist/themes/default/(throbber.gif|32px.png))
Rails.application.config.assets.precompile += %w(jstree/dist/jstree.min.js)
# for ie
Rails.application.config.assets.precompile += %w(html5shiv/dist/html5shiv.min.js respond/dest/respond.min.js)
# for select2
Rails.application.config.assets.precompile += %w(select2-ng/select2-spinner.gif select2-ng/select2.png)

# Minimum Sass number precision required by bootstrap-sass
::Sass::Script::Number.precision = [8, ::Sass::Script::Number.precision].max

