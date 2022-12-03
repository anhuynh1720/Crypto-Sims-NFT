const TheFunixCryptoSim = artifacts.require("TheFunixCryptoSim");

contract("TheFunixCryptoSim", function (/* accounts */) {
  let instance;

  before(async function () {
    instance = await TheFunixCryptoSim.deployed();
  });

  describe("Contract", function () {
    it("should deployed", function () {
      return assert.isTrue(instance !== undefined);
    });
  });

  // *** Start Code here ***
  describe('Token information', () => {
    it('The name should be TheFunixCryptoSims', () => {
      return instance.name().then((name) => {
        assert.equal(name, 'TheFunixCryptoSims');
      })
    })

    it('The symbol should be FCS', () => {
      return instance.symbol().then((symbol) => {
        assert.equal(symbol, 'FCS');
      })
    })
  });

  describe('Genesis FCS data', () => {
    it('Check the attributes of the first genesis', () => {
      return instance.sims(0).then((sims) => {
        assert.equal(sims.attributes.body, 0)
        assert.equal(sims.attributes.eye, 0)
        assert.equal(sims.attributes.hairstyle, 0)
        assert.equal(sims.attributes.outfit, 0)
        assert.equal(sims.attributes.accessory, 0)
        assert.equal(sims.attributes.hiddenGenes, 0)
        assert.equal(sims.attributes.generation, 0)
      })
    })

    it('Check the attributes of the second genesis', () => {
      return instance.sims(1).then((sims) => {
        assert.equal(sims.attributes.body, 3)
        assert.equal(sims.attributes.eye, 7)
        assert.equal(sims.attributes.hairstyle, 127)
        assert.equal(sims.attributes.outfit, 31)
        assert.equal(sims.attributes.accessory, 31)
        assert.equal(sims.attributes.hiddenGenes, 0)
        assert.equal(sims.attributes.generation, 0)
      })
    })
  })

  describe('Breed algorithm', () => {
    it('When hidden genes of sire and matron are equal, check if hidden genes of child equal to (matron hidden genes + sire hidden genes + 3) % 4', () => {
      return instance.breedSim(0, 1).then(() => {
        return instance.sims(0).then((simsSire) => {
          return instance.sims(1).then((simMatron) => {
            return instance.sims(2).then((simChild) => {
              assert.equal(simChild.attributes.hiddenGenes, (simsSire.attributes.hiddenGenes + simMatron.attributes.hiddenGenes + 3) % 4)
            })
          })
        })
      })
    })

    it('When the hidden genes of matron is larger than the hidden genes of sire, the hidden genes of child is equal to the hidden genes of matron', () => {
      return instance.breedSim(1, 2).then(() => {
        return instance.sims(2).then((simMatron) => {
          return instance.sims(3).then((simChild) => {
            //Sim 1 has the hidden genes of 0 and sims 2 has the hidden genes of 3, so hidden genes of their child will be equal to hidden genes of sim 2
            assert.equal(simChild.attributes.hiddenGenes, simMatron.attributes.hiddenGenes)
          })
        })
      })
    })

    it('When the hidden genes of sire is larger than the hidden genes of matron, the hidden genes of child is equal to the hidden genes of sire', () => {
      return instance.breedSim(2, 0).then(() => {
        return instance.sims(2).then((simSire) => {
          return instance.sims(4).then((simChild) => {
            //Sim 1 has the hidden genes of 0 and sims 2 has the hidden genes of 3, so hidden genes of their child will be equal to hidden genes of sim 2
            assert.equal(simChild.attributes.hiddenGenes, simSire.attributes.hiddenGenes)
          })
        })
      })
    })

    it('Check the attributes of the first sim bred', () => {
      return instance.sims(0).then((simMatron) => {
        return instance.sims(1).then((simSire) => {
          return instance.sims(2).then((sim) => {
            //The hidden genes of the child must be 3
            assert.equal(sim.attributes.generation, Math.max(simMatron.attributes.generation, simSire.attributes.generation) + 1)
            if (sim.attributes.generation >= 0 && sim.attributes.generation <= 255) {
              assert(true)
            } else {
              assert(false)
            }

            assert.equal(sim.attributes.body, (+simMatron.attributes.body * +simSire.attributes.body + 3) % 4)
            if (sim.attributes.body >= 0 && sim.attributes.body <= 3) {
              assert(true)
            } else {
              assert(false)
            }

            assert.equal(sim.attributes.eye, (+simMatron.attributes.eye + +simSire.attributes.eye) % 8)
            if (sim.attributes.eye >= 0 && sim.attributes.eye <= 7) {
              assert(true)
            } else {
              assert(false)
            }

            assert.equal(sim.attributes.hairstyle, simSire.attributes.hairstyle)
            if (sim.attributes.hairstyle >= 0 && sim.attributes.hairstyle <= 127) {
              assert(true)
            } else {
              assert(false)
            }

            assert.equal(sim.attributes.outfit, (+simSire.attributes.outfit + +simMatron.attributes.outfit) % 32)
            if (sim.attributes.outfit >= 0 && sim.attributes.outfit <= 32) {
              assert(true)
            } else {
              assert(false)
            }

            assert.equal(sim.attributes.accessory, (+simSire.attributes.accessory + +simMatron.attributes.accessory + 31) % 32)
            if (sim.attributes.accessory >= 0 && sim.attributes.accessory <= 32) {
              assert(true)
            } else {
              assert(false)
            }
          })
        })
      })
    })

    it('Check the attributes of the second sim bred', () => {
      return instance.sims(1).then((simMatron) => {
        return instance.sims(2).then((simSire) => {
          return instance.sims(3).then((sim) => {
            //The hidden genes of the child must be 3
            assert.equal(sim.attributes.generation, Math.max(simMatron.attributes.generation, simSire.attributes.generation) + 1)
            if (sim.attributes.generation >= 0 && sim.attributes.generation <= 255) {
              assert(true)
            } else {
              assert(false)
            }

            assert.equal(sim.attributes.body, (+simMatron.attributes.body * +simSire.attributes.body + 3) % 4)
            if (sim.attributes.body >= 0 && sim.attributes.body <= 3) {
              assert(true)
            } else {
              assert(false)
            }

            assert.equal(sim.attributes.eye, (+simMatron.attributes.eye + +simSire.attributes.eye) % 8)
            if (sim.attributes.eye >= 0 && sim.attributes.eye <= 7) {
              assert(true)
            } else {
              assert(false)
            }

            assert.equal(sim.attributes.hairstyle, simSire.attributes.hairstyle)
            if (sim.attributes.hairstyle >= 0 && sim.attributes.hairstyle <= 127) {
              assert(true)
            } else {
              assert(false)
            }

            assert.equal(sim.attributes.outfit, (+simSire.attributes.outfit + +simMatron.attributes.outfit) % 32)
            if (sim.attributes.outfit >= 0 && sim.attributes.outfit <= 32) {
              assert(true)
            } else {
              assert(false)
            }

            assert.equal(sim.attributes.accessory, (+simSire.attributes.accessory + +simMatron.attributes.accessory + 31) % 32)
            if (sim.attributes.accessory >= 0 && sim.attributes.accessory <= 32) {
              assert(true)
            } else {
              assert(false)
            }
          })
        })
      })
    })

    it('Check the attributes of the third sim bred', () => {
      return instance.sims(2).then((simMatron) => {
        return instance.sims(0).then((simSire) => {
          return instance.sims(4).then((sim) => {
            //The hidden genes of the child must be 3
            assert.equal(sim.attributes.generation, Math.max(simMatron.attributes.generation, simSire.attributes.generation) + 1)
            if (sim.attributes.generation >= 0 && sim.attributes.generation <= 255) {
              assert(true)
            } else {
              assert(false)
            }

            assert.equal(sim.attributes.body, (+simMatron.attributes.body * +simSire.attributes.body + 3) % 4)
            if (sim.attributes.body >= 0 && sim.attributes.body <= 3) {
              assert(true)
            } else {
              assert(false)
            }

            assert.equal(sim.attributes.eye, (+simMatron.attributes.eye + +simSire.attributes.eye) % 8)
            if (sim.attributes.eye >= 0 && sim.attributes.eye <= 7) {
              assert(true)
            } else {
              assert(false)
            }

            assert.equal(sim.attributes.hairstyle, simSire.attributes.hairstyle)
            if (sim.attributes.hairstyle >= 0 && sim.attributes.hairstyle <= 127) {
              assert(true)
            } else {
              assert(false)
            }

            assert.equal(sim.attributes.outfit, (+simSire.attributes.outfit + +simMatron.attributes.outfit) % 32)
            if (sim.attributes.outfit >= 0 && sim.attributes.outfit <= 32) {
              assert(true)
            } else {
              assert(false)
            }

            assert.equal(sim.attributes.accessory, (+simSire.attributes.accessory + +simMatron.attributes.accessory + 31) % 32)
            if (sim.attributes.accessory >= 0 && sim.attributes.accessory <= 32) {
              assert(true)
            } else {
              assert(false)
            }
          })
        })
      })
    })

    it('Check the attributes of the fourth sim bred', () => {
      return instance.breedSim(3, 4).then(() => {
        return instance.sims(3).then((simMatron) => {
          return instance.sims(4).then((simSire) => {
            return instance.sims(5).then((sim) => {
              //The hidden genes of the child must be 0
              assert.equal(sim.attributes.generation, Math.max(simMatron.attributes.generation, simSire.attributes.generation) + 1)
              if (sim.attributes.generation >= 0 && sim.attributes.generation <= 255) {
                assert(true)
              } else {
                assert(false)
              }

              assert.equal(sim.attributes.body, (+simMatron.attributes.body * +simSire.attributes.body + 3) % 4)
              if (sim.attributes.body >= 0 && sim.attributes.body <= 3) {
                assert(true)
              } else {
                assert(false)
              }

              assert.equal(sim.attributes.eye, simSire.attributes.eye)
              if (sim.attributes.eye >= 0 && sim.attributes.eye <= 7) {
                assert(true)
              } else {
                assert(false)
              }

              assert.equal(sim.attributes.hairstyle, simMatron.attributes.hairstyle)
              if (sim.attributes.hairstyle >= 0 && sim.attributes.hairstyle <= 127) {
                assert(true)
              } else {
                assert(false)
              }

              assert.equal(sim.attributes.outfit, (+simSire.attributes.outfit + +simMatron.attributes.outfit + 1) % 32)
              if (sim.attributes.outfit >= 0 && sim.attributes.outfit <= 32) {
                assert(true)
              } else {
                assert(false)
              }

              assert.equal(sim.attributes.accessory, (+simSire.attributes.accessory + +simMatron.attributes.accessory) % 32)
              if (sim.attributes.accessory >= 0 && sim.attributes.accessory <= 32) {
                assert(true)
              } else {
                assert(false)
              }
            })
          })
        })
      })
    })

    it('Check the attributes of the fifth sim bred', () => {
      return instance.breedSim(4, 5).then(() => {
        return instance.sims(4).then((simMatron) => {
          return instance.sims(5).then((simSire) => {
            return instance.sims(6).then((sim) => {
              //The hidden genes of the child must be 3
              assert.equal(sim.attributes.generation, Math.max(simMatron.attributes.generation, simSire.attributes.generation) + 1)
              if (sim.attributes.generation >= 0 && sim.attributes.generation <= 255) {
                assert(true)
              } else {
                assert(false)
              }
  
              assert.equal(sim.attributes.body, (+simMatron.attributes.body * +simSire.attributes.body + 3) % 4)
              if (sim.attributes.body >= 0 && sim.attributes.body <= 3) {
                assert(true)
              } else {
                assert(false)
              }
  
              assert.equal(sim.attributes.eye, (+simMatron.attributes.eye + +simSire.attributes.eye) % 8)
              if (sim.attributes.eye >= 0 && sim.attributes.eye <= 7) {
                assert(true)
              } else {
                assert(false)
              }
  
              assert.equal(sim.attributes.hairstyle, simSire.attributes.hairstyle)
              if (sim.attributes.hairstyle >= 0 && sim.attributes.hairstyle <= 127) {
                assert(true)
              } else {
                assert(false)
              }
  
              assert.equal(sim.attributes.outfit, (+simSire.attributes.outfit + +simMatron.attributes.outfit) % 32)
              if (sim.attributes.outfit >= 0 && sim.attributes.outfit <= 32) {
                assert(true)
              } else {
                assert(false)
              }
  
              assert.equal(sim.attributes.accessory, (+simSire.attributes.accessory + +simMatron.attributes.accessory + 31) % 32)
              if (sim.attributes.accessory >= 0 && sim.attributes.accessory <= 32) {
                assert(true)
              } else {
                assert(false)
              }
            })
          })
        })
      })
    })

    it('Check the attributes of the sixth sim bred', () => {
      return instance.breedSim(5, 6).then(() => {
        return instance.sims(5).then((simMatron) => {
          return instance.sims(6).then((simSire) => {
            return instance.sims(7).then((sim) => {
              //The hidden genes of the child must be 3
              assert.equal(sim.attributes.generation, Math.max(simMatron.attributes.generation, simSire.attributes.generation) + 1)
              if (sim.attributes.generation >= 0 && sim.attributes.generation <= 255) {
                assert(true)
              } else {
                assert(false)
              }
  
              assert.equal(sim.attributes.body, (+simMatron.attributes.body * +simSire.attributes.body + 3) % 4)
              if (sim.attributes.body >= 0 && sim.attributes.body <= 3) {
                assert(true)
              } else {
                assert(false)
              }
  
              assert.equal(sim.attributes.eye, (+simMatron.attributes.eye + +simSire.attributes.eye) % 8)
              if (sim.attributes.eye >= 0 && sim.attributes.eye <= 7) {
                assert(true)
              } else {
                assert(false)
              }
  
              assert.equal(sim.attributes.hairstyle, simSire.attributes.hairstyle)
              if (sim.attributes.hairstyle >= 0 && sim.attributes.hairstyle <= 127) {
                assert(true)
              } else {
                assert(false)
              }
  
              assert.equal(sim.attributes.outfit, (+simSire.attributes.outfit + +simMatron.attributes.outfit) % 32)
              if (sim.attributes.outfit >= 0 && sim.attributes.outfit <= 32) {
                assert(true)
              } else {
                assert(false)
              }
  
              assert.equal(sim.attributes.accessory, (+simSire.attributes.accessory + +simMatron.attributes.accessory + 31) % 32)
              if (sim.attributes.accessory >= 0 && sim.attributes.accessory <= 32) {
                assert(true)
              } else {
                assert(false)
              }
            })
          })
        })
      })
    })

    it('Check the attributes of the seventh sim bred', () => {
      return instance.breedSim(6, 7).then(() => {
        return instance.sims(6).then((simMatron) => {
          return instance.sims(7).then((simSire) => {
            return instance.sims(8).then((sim) => {
              //The hidden genes of the child must be 0
              assert.equal(sim.attributes.generation, Math.max(simMatron.attributes.generation, simSire.attributes.generation) + 1)
              if (sim.attributes.generation >= 0 && sim.attributes.generation <= 255) {
                assert(true)
              } else {
                assert(false)
              }

              assert.equal(sim.attributes.body, (+simMatron.attributes.body * +simSire.attributes.body + 3) % 4)
              if (sim.attributes.body >= 0 && sim.attributes.body <= 3) {
                assert(true)
              } else {
                assert(false)
              }

              assert.equal(sim.attributes.eye, simSire.attributes.eye)
              if (sim.attributes.eye >= 0 && sim.attributes.eye <= 7) {
                assert(true)
              } else {
                assert(false)
              }

              assert.equal(sim.attributes.hairstyle, simMatron.attributes.hairstyle)
              if (sim.attributes.hairstyle >= 0 && sim.attributes.hairstyle <= 127) {
                assert(true)
              } else {
                assert(false)
              }

              assert.equal(sim.attributes.outfit, (+simSire.attributes.outfit + +simMatron.attributes.outfit + 1) % 32)
              if (sim.attributes.outfit >= 0 && sim.attributes.outfit <= 32) {
                assert(true)
              } else {
                assert(false)
              }

              assert.equal(sim.attributes.accessory, (+simSire.attributes.accessory + +simMatron.attributes.accessory) % 32)
              if (sim.attributes.accessory >= 0 && sim.attributes.accessory <= 32) {
                assert(true)
              } else {
                assert(false)
              }
            })
          })
        })
      })
    })

    it('Check the attributes of the eighth sim bred', () => {
      return instance.breedSim(7, 8).then(() => {
        return instance.sims(7).then((simMatron) => {
          return instance.sims(8).then((simSire) => {
            return instance.sims(9).then((sim) => {
              //The hidden genes of the child must be 3
              assert.equal(sim.attributes.generation, Math.max(simMatron.attributes.generation, simSire.attributes.generation) + 1)
              if (sim.attributes.generation >= 0 && sim.attributes.generation <= 255) {
                assert(true)
              } else {
                assert(false)
              }
  
              assert.equal(sim.attributes.body, (+simMatron.attributes.body * +simSire.attributes.body + 3) % 4)
              if (sim.attributes.body >= 0 && sim.attributes.body <= 3) {
                assert(true)
              } else {
                assert(false)
              }
  
              assert.equal(sim.attributes.eye, (+simMatron.attributes.eye + +simSire.attributes.eye) % 8)
              if (sim.attributes.eye >= 0 && sim.attributes.eye <= 7) {
                assert(true)
              } else {
                assert(false)
              }
  
              assert.equal(sim.attributes.hairstyle, simSire.attributes.hairstyle)
              if (sim.attributes.hairstyle >= 0 && sim.attributes.hairstyle <= 127) {
                assert(true)
              } else {
                assert(false)
              }
  
              assert.equal(sim.attributes.outfit, (+simSire.attributes.outfit + +simMatron.attributes.outfit) % 32)
              if (sim.attributes.outfit >= 0 && sim.attributes.outfit <= 32) {
                assert(true)
              } else {
                assert(false)
              }
  
              assert.equal(sim.attributes.accessory, (+simSire.attributes.accessory + +simMatron.attributes.accessory + 31) % 32)
              if (sim.attributes.accessory >= 0 && sim.attributes.accessory <= 32) {
                assert(true)
              } else {
                assert(false)
              }
            })
          })
        })
      })
    })
  })
  // *** End Code here ***
});
