const form = document.querySelector('form')
const result = document.querySelector('p')

const splitBill = (friends, bill, tip) => {
    if (friends === '' || bill === '' || tip === '') {
        throw new Error('Alla fält måste vara ifyllda')
    }

    const parsedFriends = parseInt(friends)
    if (isNaN(parsedFriends) || parsedFriends < 2) {
        throw new Error('Antal vänner måste vara ett nummer och minst 2')
    }

    const parsedBill = parseInt(bill * 100)
    if (isNaN(parsedBill) || parsedBill < 0) {
        throw new Error('Summan måste vara ett nummer och större än 0')
    }

    const parsedTip = parseInt(tip)
    if (isNaN(parsedTip) || parsedTip < 0 || parsedTip > 100) {
        throw new Error('Dricksen måste vara ett nummer och mellan 0 och 100')
    }

    const tipPercentage = parsedTip / 100

    const tipAmount = parsedBill * tipPercentage

    const billWithTip = parsedBill + tipAmount

    const pricePerFriend = billWithTip / parsedFriends

    const rest = (billWithTip / 100) % parsedFriends

    return {
        pricePerFriend: parseInt(pricePerFriend / 100),
        rest: rest,
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(form)

    const friends = formData.get('friends')
    const bill = formData.get('sum')
    const tip = formData.get('tip')

    try {
        const share = splitBill(friends, bill, tip)
        result.textContent = `Ni ska betala ${share.pricePerFriend} kronor var. Det blir ${share.rest} kronor över.`
    } catch (error) {
        alert(error.message)
    }
})
