import React, {useContext, useEffect, useState} from "react";
import {GameContext} from "../../api/GameLogicDataContext";
import '../../styles/PlayField.css'


const PlayField: React.FC = () => {
    const game = useContext(GameContext);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const unsubscribe = game.subscribeToScoreChanges(() => {
            setScrollPosition(0)
            const targetScrollPosition =
                game.getPlayers()[game.currentPlayer].scores[game.currentRound - 1] * 400;
            // Duration of animation in milliseconds
            const animationDuration = 5000; // 5 seconds
            // Get the current time
            const startTime = performance.now();
            // Define animation function
            function animateScroll(currentTime: number) {
                // Calculate elapsed time since animation start
                const elapsedTime = currentTime - startTime;
                // Calculate progress of animation (0 to 1)
                const progress = elapsedTime / animationDuration;
                // Calculate eased progress for smoother animation (e.g., using easeInOutQuad)
                const easedProgress = easeInOutQuad(progress);
                // Calculate the new scroll position
                const newScrollPosition = scrollPosition + (targetScrollPosition - scrollPosition) * easedProgress;
                // Update the state with the new scroll position
                setScrollPosition(newScrollPosition);
                // Check if animation should continue
                if (elapsedTime < animationDuration) {
                    requestAnimationFrame(animateScroll);
                }
            }
            // Start the animation
            requestAnimationFrame(animateScroll);
        });

        return () => {
            unsubscribe();
        };
    }, [game, scrollPosition]);

    // Easing function (you can replace this with any other easing function)
    function easeInOutQuad(t: number) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }




    return (
        <div className="parallax">
            <img className="layerBack" src={"src/sprites/Background/Background_Layer_Mountains_widened.png"} style={{ left: `${-scrollPosition * 0.5}px` }}></img>
            <img className="layerMiddle" src={"src/sprites/Background/Background_Layer_Clouds_widened.png"} style={{ left: `${-scrollPosition * 0.3}px` }}></img>
            <img className="layerDefault" src={"src/sprites/Background/Background_Layer_Ground.png"}></img>
            <img className="layerFront" src={"src/sprites/Background/Background_Layer_Flowers_horz.png"} style={{ left: `${-scrollPosition * 0.1}px` }}></img>
        </div>
    );
}

export default PlayField