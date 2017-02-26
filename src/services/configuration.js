const { loaders, processors: { json } } = require('confabulous');
const Confabulous = require('confabulous');

module.exports = () => new Promise((resolve, reject) => {
  new Confabulous()
    .add(() => {
      const loader = process.env.NODE_ENV === 'dev' ?
        loaders.file({ path: './conf/dev/configuration.json' }, [json()]) :
        loaders.file({ path: './conf/prod/configuration.json' }, [json()]);
      return loader;
    })
    .end((err, config) => {
      if (err) reject(err);
      resolve(config);
    });
});
