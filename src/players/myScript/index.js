const MineiroScript = (scenery, myMove) => {
  let myPlay = Math.floor(Math.random() * 8);
  /* Fontes de Verdade */
  const getScenery = () => {
    return [...scenery];
  };

  const inColumnSceneryImplementId = () => {
    const newScenery = getScenery();

    const columnsWithId = [];

    newScenery.forEach((column, index) => {
      columnsWithId.push({
        _id: index,
        column,
      });
    });

    return columnsWithId;
  };

  const getColumnSceneryForId = (id) => {
    const columnsWithId = inColumnSceneryImplementId();

    const column = columnsWithId.find((column) => column._id === id);

    return column;
  };

  const updateColumnScenery = (newProps) => {
    const columnScenery = getColumnSceneryForId(newProps._id);

    const newColumnScenery = { ...columnScenery, qtdPlays: newProps.qtdPlays };

    return newColumnScenery;
  };

  /* Tratando Cenário Inicial*/
  const countPlaysOpponent = (id) => {
    const columnScenery = getColumnSceneryForId(id);

    let qtdPlays;

    for (let i = 0; i < columnScenery.column.length; i++) {
      qtdPlays = columnScenery.column.filter((play) => play == 0).length;
    }

    const sceneryUpdate = updateColumnScenery({
      _id: columnScenery._id,
      qtdPlays,
    });

    return sceneryUpdate;
  };

  const analyzeScenery = () => {
    const newScenery = getScenery();
    const newSceneryWithQtd = [];

    for (let i = 0; i < newScenery.length; i++) {
      const newSceneryColumns = countPlaysOpponent(i);

      newSceneryWithQtd.push(newSceneryColumns);
    }

    analyzeSceneryWithQtd(newSceneryWithQtd);
  };

  /* Analisando Cenário Atualizado*/
  const analyzeSceneryWithQtd = (newSceneryWithQtd) => {
    const qtdPlaysAnalyze = [];
    newSceneryWithQtd.forEach((column) => {
      qtdPlaysAnalyze.push(column.qtdPlays);
    });

    defineMove(qtdPlaysAnalyze, newSceneryWithQtd);
  };

  /* Tomada de Decisão */
  const defineMove = (analyzeQtdPlay, newSceneryWithQtd) => {
    const protection = [];

    newSceneryWithQtd.map((column) => {
      protection.push(column.qtdPlays);
    });

    /* Defesas em pontos criticos */
    if (protection[2] == 1 && protection[3] == 1 && protection[1] == 0) {
      return (myPlay = 4);
    }

    if (protection[1] == 1 && protection[2] == 1 && protection[3] == 1) {
      return (myPlay = 0);
    }

    if (protection[3] == 1 && protection[4] == 1 && protection[5] == 1) {
      return (myPlay = 6);
    }

    if (protection[6] == 2 && protection[7] == 1) {
      return (myPlay = 7);
    }
    /* Fim defesas pontos críticos */

    if (Math.min(...analyzeQtdPlay) < 2) {
      const attackOpponent = analyzeQtdPlay.reduce((acc, play) => {
        return (acc += play);
      }, 1);

      if (attackOpponent <= 8) {
        myPlay = attackOpponent;
      } else {
        myPlay = Math.floor(Math.random() * 8);
      }
    }

    if (Math.max(...analyzeQtdPlay) >= 2) {
      analyzeQtdPlay.find((element, index) => {
        if (element == 2) {
          myPlay = index;
        }
      });
    }
  };

  /* Inicializando o Script */
  analyzeScenery();

  return myPlay;
};

export default MineiroScript;
