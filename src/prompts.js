// export a function to return a random prompt from the prompts object
export const getRandomPrompt = ({ diceRoll, channel, ogChatter, randomChatter, random1, random2, random3 }) => {

    const prompts = {
        1: [
            `CRITICAL FAIL! The attempt to summon an Australian spider storm fails catastrophically FailFish`,
        ],
        2: [
            `They somehow manage to conjure pizza for ${randomChatter} <3`,
        ],
        3: [
            `They narrowly avoid being crushed by ${randomChatter}'s giant fist KAPOW`,
        ],
        4: [
            `They dodge to the side... just about escaping ${channel}'s booty destruction attack!`,
        ],
        5: [
            `They hardly have enough time to step aside as a wave of meat-eating ants rushes past!`,
        ],
        6: [
            `...but it's not enough :( ${randomChatter} deals them ${random1} damage NotLikeThis`,
        ],
        7: [
            `They summon an army of spiders to attack ${randomChatter} cmonBruh`,
        ],
        8: [
            `They successfully sneak into ${channel}'s lair, hijacking the stream and foiling their plans to take over the world Kreygasm`,
        ],
        9: [
            `They are able to charge and fire their deadly laser attack, dealing ${random2} to ${channel}!`,
        ],
        10: [
            `They duck behind ${randomChatter} and try to sneak attack, but it failed...`,
        ],
        11: [
            `They set ${randomChatter} on fire, dealing them ${random2} damage CurseLit`,
        ],
        12: [
            `They summon a small wave of giant, flesh-eating spiders DansGame`,
        ],
        13: [
            `They hack into the streamoiwj043jit34 32@@#sdf df - THIS IS NOW ${ogChatter}'s STREAM`,
        ],
        14: [
            `They unleash a mighty frost attack on ${channel}, but ${channel} casts a shield at the last second and reflects in right back in ${ogChatter}'s face`,
        ],
        15: [
            `They cast a taco illusion spell on ${randomChatter}, who falls for it and suffers ${random2} heartbreak damage when they discover it was never real :(`,
        ],
        16: [
            `They summon a demogorgon from the Upside Down... it appears in ${randomChatter}'s shed and abducts them o.o`,
        ],
        17: [
            `They successfully hack into the stream, banning ${channel}, unmodding all the mods and DDOS-ing everyone OpieOP`,
        ],
        18: [
            `They conjure the almighty ${channel}-nado, destroying everything in its path and replacing it with a clone of ${channel}. The ${channel}-ness of the situation deals everyone a healthy ${random2} damage KAPOW`,
        ],
        19: [
            `They whoosh up into the sky, then hurtle back down, focusing on a single point: ${channel}... but they missed. They dealt themself a staggering ${random2} damage!`,
        ],
        20: [
            `They fly into the air and spread their arms, summoning a rainstorm of drop bears and Huntsman spiders DansGame DansGame Everyone in chat is dealt a brutal ${random2} damage!`,
        ]
    }

    return prompts[diceRoll]
}