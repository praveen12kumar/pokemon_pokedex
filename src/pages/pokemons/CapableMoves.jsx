
import React, { useContext, useEffect, useState } from 'react'
import PokeContext from '../../context/pokeContext';
import Footer from '../../components/Footer';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

function CapableMoves(){

  const {
    pokemon, loading, setCurrentTab,
    getMoveDetail, clearMoveDetail, moveDetail,
    getAbilityDetail, clearAbilityDetail, abilityDetail,
  } = useContext(PokeContext);

  const [activeModal, setActiveModal] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

  useEffect(()=>{
    setCurrentTab("moves");
  },[]);

  const handleOpenAbility = async (name) => {
    setActiveModal("ability");
    setModalError(null);
    setModalLoading(true);
    try {
      await getAbilityDetail(name);
    } catch (error) {
      setModalError("Couldn't load ability details.");
    } finally {
      setModalLoading(false);
    }
  }

  const handleOpenMove = async (name) => {
    setActiveModal("move");
    setModalError(null);
    setModalLoading(true);
    try {
      await getMoveDetail(name);
    } catch (error) {
      setModalError("Couldn't load move details.");
    } finally {
      setModalLoading(false);
    }
  }

  const handleCloseModal = () => {
    setActiveModal(null);
    setModalError(null);
    clearAbilityDetail();
    clearMoveDetail();
  }

  const abilityEffect = abilityDetail?.effect_entries?.find((e) => e.language.name === "en")?.short_effect;
  const moveEffect = moveDetail?.effect_entries?.find((e) => e.language.name === "en")?.short_effect;

  return (
    <>
      {
        loading ? <Loader/> : (
          <div className='w-full mx-auto  min-h-[calc(100vh-10vh)]  flex flex-col gap-6 px-10 py-5 relative'>
        <div className="w-full flex flex-col gap-8">
          <h1 className='text-3xl font-nunito font-bold uppercase text-slate-100'>Abilites</h1>
          <div className=" w-full flex flex-wrap items-center justify-start gap-8">
            {
              pokemon?.abilities?.map((ability)=>{
                return(
                  <p
                    onClick={() => handleOpenAbility(ability?.ability?.name)}
                    className='w-[15vw] h-[6vw] flex items-center justify-center uppercase  bg-green-700 text-xl rounded-lg font-nunito text-slate-100 tracking-wider hover:scale-105 transition-all duration-300 ease-in cursor-pointer'
                    key={ability?.ability?.name}
                  >{ability?.ability?.name}</p>
                )
              })
            }
          </div>
        </div>

        {pokemon?.held_items?.length > 0 && (
          <div className="w-full flex flex-col gap-8">
            <h1 className='text-3xl font-nunito font-bold uppercase text-slate-100'>Held Items</h1>
            <div className="w-full flex flex-wrap items-center justify-start gap-8">
              {pokemon.held_items.map((item) => (
                <p
                  key={item?.item?.name}
                  className='px-4 py-2 flex items-center justify-center uppercase bg-slate-700 text-sm rounded-lg font-nunito text-slate-100 tracking-wider'
                >
                  {item?.item?.name?.replaceAll("-", " ")}
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="w-full mb-20">
        <h1 className='text-3xl font-nunito font-bold uppercase text-slate-100'>Moves</h1>
            <div className="flex gap-6 flex-wrap  justify-center pt-10">
            {
              pokemon?.moves?.map((move)=>{
                const learnDetail = move?.version_group_details?.[move.version_group_details.length - 1];
                return(
                  <div
                    onClick={() => handleOpenMove(move?.move?.name)}
                    className='w-[14vw] h-[6vw] flex flex-col items-center justify-center uppercase  bg-slate-800 text-md rounded-lg font-nunito text-slate-100 tracking-wider hover:scale-105 transition-all duration-300 ease-in cursor-pointer gap-1'
                    key={move?.move?.name}
                  >
                    <span>{move?.move?.name}</span>
                    {learnDetail && (
                      <span className='text-[10px] normal-case text-slate-400'>
                        {learnDetail.move_learn_method?.name?.replaceAll("-", " ")}
                        {learnDetail.level_learned_at > 0 ? ` · Lv ${learnDetail.level_learned_at}` : ""}
                      </span>
                    )}
                  </div>
                )
              })
            }
            </div>
        </div>
        <div className=" w-full z-30 absolute left-0 bottom-0 bg-[#0F1520]">
        <Footer/>
        </div>
        </div>
        )
      }

      {activeModal === "ability" && (
        <Modal onClose={handleCloseModal}>
          {modalLoading ? (
            <p className="text-sm">Loading...</p>
          ) : modalError ? (
            <p className="text-sm text-red-400">{modalError}</p>
          ) : (
            <>
              <h2 className="text-2xl uppercase font-bold mb-3">{abilityDetail.name}</h2>
              <p className="text-sm leading-relaxed">{abilityEffect || "No description available."}</p>
            </>
          )}
        </Modal>
      )}

      {activeModal === "move" && (
        <Modal onClose={handleCloseModal}>
          {modalLoading ? (
            <p className="text-sm">Loading...</p>
          ) : modalError ? (
            <p className="text-sm text-red-400">{modalError}</p>
          ) : (
            <>
              <h2 className="text-2xl uppercase font-bold mb-3 flex items-center gap-2">
                {moveDetail.name}
                {moveDetail?.type?.name && (
                  <span className="text-xs bg-slate-700 px-2 py-1 rounded-md normal-case">{moveDetail.type.name}</span>
                )}
              </h2>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <p><strong>Power:</strong> {moveDetail.power ?? "—"}</p>
                <p><strong>Accuracy:</strong> {moveDetail.accuracy ?? "—"}</p>
                <p><strong>PP:</strong> {moveDetail.pp ?? "—"}</p>
                <p><strong>Class:</strong> {moveDetail.damage_class?.name ?? "—"}</p>
              </div>
              <p className="text-sm leading-relaxed">{moveEffect || "No description available."}</p>
            </>
          )}
        </Modal>
      )}
    </>
  )
}

export default CapableMoves