import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useNickname } from "../context/NicknameProvider";
import { useDependencies } from "../context/DependenciesProvider";

import { GameHistory } from "../modules/game/model";

function Home() {
  const { gameHistoryDatasource } = useDependencies();
  const { nickName, updateNickName } = useNickname();
  const navigate = useNavigate();
  const [history, updateGameHistory] = useState<GameHistory[]>([]);

  const sortedHistory = [...history].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  useEffect(() => {
    gameHistoryDatasource
      .fetch()
      .then(updateGameHistory)
      .catch((error) => console.error(error));
  }, [gameHistoryDatasource, updateNickName]);

  return (
    <div>
      <h2 className="font-bold">Historique des parties</h2>

      <div className="overflow-x-auto mb-14">
        {/* Le contenu est un exemple */}
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Joueur</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {sortedHistory.map((gameHistory) => (
              <tr key={gameHistory.id}>
                <td>{gameHistory.player}</td>
                <td>
                  {gameHistory.score.good} / {gameHistory.score.total}
                </td>
                <td>
                  {gameHistory.date.toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form
        className="join"
        onSubmit={(e) => {
          e.preventDefault();
          // Ici, on utilise la méthode "navigate" de React router
          // Pour pouvoir faire une redirection vers une autre page
          // avec l'utilisation de JavaScript
          navigate("/game");
        }}
      >
        <input
          className="input input-bordered join-item"
          placeholder="Ton pseudo"
          value={nickName}
          onChange={(e) => updateNickName(e.target.value)}
        />
        <button className="btn btn-primary join-item rounded-r-full">
          Jouer une partie
        </button>
      </form>
    </div>
  );
}

export default Home;
