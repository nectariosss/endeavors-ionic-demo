import { Injectable } from '@angular/core';
import { EndeavorsService } from './endeavors.service';

@Injectable({
  providedIn: 'root',
})
export class NameGeneratorService {
  constructor() {}

  randomName: string;

  preciousStonesAndMinerals = [
    'amethyst',
    'aquamarine',
    'diamond',
    'emerald',
    'garnet',
    'jade',
    'jasper',
    'lapis',
    'moonstone',
    'opal',
    'pearl',
    'peridot',
    'ruby',
    'sapphire',
    'topaz',
    'tourmaline',
    'turquoise',
    'agate',
    'amber',
    'citrine',
    'coral',
    'onyx',
    'quartz',
    'tanzanite',
    'zircon',
    'malachite',
    'morganite',
    'obsidian',
    'rhodonite',
    'sunstone',
    'alexandrite',
    'chrysocolla',
    'labradorite',
    'spinel',
    'sugilite',
    'aventurine',
    'bloodstone',
    'carnelian',
    'fluorite',
    'iolite',
    'kunzite',
    'larimar',
    'sodalite',
    'tigerseye',
    'tsavorite',
    'beryl',
    'chalcedony',
    'hematite',
    'pyrite',
    'rosequartz',
  ];

  statesArray = [
    'diffused',
    'concentrated',
    'dispersed',
    'unified',
    'fragmented',
    'cohesive',
    'diluted',
    'solidified',
    'liquified',
    'gaseous',
    'suspended',
    'absorbed',
    'disintegrated',
    'coalesced',
    'crystallized',
    'vaporized',
    'distorted',
    'energized',
    'stagnant',
    'vibrant',
    'petrified',
    'compressed',
    'decayed',
    'ionized',
    'neutralized',
    'polarized',
    'sedimented',
    'eroded',
    'dissolved',
    'sublimated',
    'aggregated',
    'enthralled',
    'engulfed',
    'elated',
    'desolated',
    'radiant',
    'receded',
    'swollen',
    'taut',
    'slacked',
    'intensified',
    'languid',
    'hallowed',
    'oscillated',
    'reverberated',
    'muted',
    'amplified',
    'resonated',
    'evaporated',
    'precipitated',
  ];

  connectingNouns = [
    'connection',
    'link',
    'sense',
    'bond',
    'tie',
    'attachment',
    'bridge',
    'relation',
    'chain',
    'alliance',
    'union',
    'junction',
    'hookup',
    'interface',
    'nexus',
    'interlink',
    'merge',
    'combination',
    'coupling',
    'fusion',
    'network',
    'binding',
    'collaboration',
    'partnership',
    'association',
    'conjunction',
    'affiliation',
    'hook',
    'node',
    'confluence',
    'intertwine',
    'matrix',
    'linkage',
    'entanglement',
    'concatenation',
    'cohesion',
    'amalgamation',
    'synergy',
    'interchange',
    'conductor',
    'channel',
    'communion',
    'harbor',
    'port',
    'receptor',
    'integrative',
    'interplay',
    'crossroads',
    'hub',
    'meeting',
  ];

  generateName(endeavors) {
    // Get the names of the endeavors to check if the random name is already in use
    const endeavorsNames = endeavors.map((endeavor) => endeavor.name);
    const randomPreciousStone =
      this.preciousStonesAndMinerals[
        Math.floor(Math.random() * this.preciousStonesAndMinerals.length)
      ];
    const randomState =
      this.statesArray[Math.floor(Math.random() * this.statesArray.length)];
    const randomConnectingNoun =
      this.connectingNouns[
        Math.floor(Math.random() * this.connectingNouns.length)
      ];
    const arrayOfNames = [
      randomPreciousStone,
      randomState,
      randomConnectingNoun,
    ];

    // Construct a random name of two words based on the above random names
    let randomName =
      arrayOfNames[Math.floor(Math.random() * arrayOfNames.length)] +
      ' ' +
      arrayOfNames[Math.floor(Math.random() * arrayOfNames.length)];

    // if random name is in the names of the endeavors, generate a new name
    while (endeavorsNames.includes(randomName)) {
      let randomIndex1 = Math.floor(Math.random() * arrayOfNames.length);
      let randomIndex2 = Math.floor(Math.random() * arrayOfNames.length);

      // Ensure the two indices are not the same
      while (randomIndex1 === randomIndex2) {
          randomIndex2 = Math.floor(Math.random() * arrayOfNames.length);
      }

      randomName = arrayOfNames[randomIndex1] + ' ' + arrayOfNames[randomIndex2];
  }

    this.randomName = randomName;
    return randomName;
  }
}
