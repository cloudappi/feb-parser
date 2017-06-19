'use strict';

module.exports = {
  name: 'fase-grupo',
  matcher: /^Fase: .+ \/ Grupo: .+/,
  handler: function(value) {
    const parts = value.split(' / ');

    const phase = parts[0].split(': ')[1];
    const group = parts[1].split(': ')[1];

    return { phase, group };
  },
};
