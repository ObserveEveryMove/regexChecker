const regInput = document.getElementById("regInput")
const strInput = document.getElementById("strInput")

const regForm = document.getElementById("regForm")

const flagsMenu = document.getElementById("flagsMenu")
const flagDisp = document.getElementById("flagDisp")

const replaceDiv = document.getElementById("replaceDiv")

const methodsMenu = document.getElementById("methodsMenu")
const methodDisp = document.getElementById("methodDisp")

const clearButton = document.getElementById("clearButton")

const regExOutput = document.getElementById("regExOutput")
const testOutput = document.getElementById("testOutput")
const matchOutput = document.getElementById("matchOutput")
const splitOutput = document.getElementById("splitOutput")
const replaceOutput = document.getElementById("replaceOutput")
const warning = document.getElementById("warning")

const outputCard = document.getElementById("outputCard")
const warningCard = document.getElementById("warningCard")

let testInput = document.getElementById("test")
let matchInput = document.getElementById("match")
let splitInput = document.getElementById("split")
let replaceInput = document.getElementById("replace")

const showInput = document.createElement("input")

showInput.style.display = "none"
showInput.setAttribute("placeholder", "Replace string")
showInput.setAttribute("class", "replaceInput")
const replaceMethodText = document.createElement("h2")
const replaceDir = document.createElement("h2")
replaceDir.innerText = "Replace with?  \""
const quote = document.createElement("h2")
quote.innerText = "\""
quote.style.display = "none"
replaceDir.style.display = "none"
replaceDiv.append(replaceDir)

replaceDiv.append(showInput)
replaceDiv.append(quote)



let state = {
    flags: [],
    windowSize: window.innerWidth,
    methods: [],
    replace: ""
}

////handles methods and pushes methods into state.methods for each eventlistener
testInput.addEventListener("change", () => {
    let test = testInput.value
    if (!state.methods.includes(test)) {
        state.methods.push(test)
        warningCard.removeAttribute("class")
        warning.removeAttribute("class")
        warning.innerText = ""
    }
    else {
        state.methods = state.methods.filter(e => e !== test)
    }
    console.log(state.methods)
})
matchInput.addEventListener("change", () => {
    let match = matchInput.value
    if (!state.methods.includes(match)) {
        state.methods.push(match)
        warningCard.removeAttribute("class")
        warning.removeAttribute("class")
        warning.innerText = ""
    }
    else {
        state.methods = state.methods.filter(e => e !== match)
    }
    console.log(state.methods)
})
splitInput.addEventListener("change", () => {
    let split = splitInput.value
    if (!state.methods.includes(split)) {
        state.methods.push(split)
        warningCard.removeAttribute("class")
        warning.removeAttribute("class")
        warning.innerText = ""
    }
    else {
        state.methods = state.methods.filter(e => e !== split)
    }
    console.log(state.methods)
})
replaceInput.addEventListener("change", () => {
    let replace = replaceInput.value
    if (!state.methods.includes(replace)) {
        state.methods.push(replace)
        warning.innerText = ""
        warningCard.removeAttribute("class")
        warning.removeAttribute("class")
        showInput.style.display = "inline"
        replaceDir.style.display = "inline"
        quote.style.display = "inline"
        showInput.setAttribute("required", true)
    }
    else {
        state.methods = state.methods.filter(e => e !== replace)
        showInput.style.display = "none"
        replaceDir.style.display = "none"
        quote.style.display = "none"

    }
    console.log(state.methods)
})

//////format input width based on input size and window size/////
const formatInputWidth = () => {
    regInput.style.width = "150px"
    regInput.addEventListener("input", () => {
        let counter = regInput.value.length
        if (window.innerWidth < 888) {
            if (counter < 14) {
                regInput.style.width = "132px"
            }
            else if (counter > 25) {
                regInput.style.width = "300px"
            }
            else {
                regInput.style.width = (counter * 12).toString() + "px"
            }
        }
        ////full screen
        else if (window.innerWidth > 888) {
            if (counter < 14) {
                regInput.style.width = "150px"
            }
            else

                if (counter > 37) {
                    regInput.style.width = "445px"
                }
                else {
                    regInput.style.width = (counter * 12).toString() + "px"
                }
        }
    })
}
formatInputWidth()


///////flags menu logic to populate array and utilize in reg constructor///////
const handleFlags = () => {
    let flag = flagsMenu.value
    // state.flags = Array.from(new Set(state.flags)).filter(e => e !== "Flags")
    if (state.flags.includes(flag)) {
        state.flags = state.flags.filter(e => e !== flag)
    } else {
        state.flags.push(flag)
    }
    if (state.flags.length === 0) {
        flagDisp.innerText = "No flags selected"
    }
    else {
        flagDisp.innerText = state.flags.join(" ")
    }
    flagsMenu.value = "Flags"
}
flagsMenu.addEventListener("change", (e) => handleFlags(e))
flagDisp.innerText = "No flags selected"


const handleRegex = () => {
    // get values from inputs and from state to implement in regex
    let str = strInput.value
    let regex = regInput.value
    let flags = state.flags.join("")
    let replaceText = showInput.value
    //regExp constructor
    let reg = new RegExp(regex, flags)
    // methods set to variables
    let test = reg.test(str)
    let match = str.match(reg)
    let split = str.split(reg)
    let replace = str.replace(reg, replaceText)
    //if state.methods has no methods, display warning card to choose a method
    if (state.methods.length === 0) {
        outputCard.removeAttribute("class")
        warningCard.setAttribute("class", "warningCard")
        warning.setAttribute("class", "cardFont")
        warning.innerText = `Please choose a method.`
    }
    //if test is true, then check to see which methods are in state.methods and display text of results and add the styling
    else if (reg.test(str)) {
        outputCard.setAttribute("class", "outputCard")
        warning.removeAttribute("class")
        warningCard.removeAttribute("class")
        regExOutput.setAttribute("class", "cardFont")
        regExOutput.innerText = `const reg = ${reg}`
        if (state.methods.includes("test")) {
            testOutput.setAttribute("class", "cardFont")
            testOutput.innerText = `${reg}.test(str) \n returns ${test}`
        }
        if (state.methods.includes("match")) {
            matchOutput.setAttribute("class", "cardFont")
            if (match.length === 1) {
                matchOutput.innerText = `str.match(${reg}) \n returns [${match.map(e => e = `"${e}"`)}] \n match returned: ${match.length} result. \n Use g flag to perform global match.`
            }
            else {
                matchOutput.innerText = `str.match(${reg}) \n returns [${match.map(e => e = `"${e}"`)}] \n match returned: ${match.length} results.`
            }
        }
        if (state.methods.includes("split")) {
            splitOutput.setAttribute("class", "cardFont")
            splitOutput.innerText = `str.split(${reg}) \n returns [${split.map(e => e === "" ? e = "\'\'" : e)}] \n original string length: ${strInput.value.length} \n array length: ${split.length}`
        }
        if (state.methods.includes("replace")) {
            replaceOutput.setAttribute("class", "cardFont")
            replaceOutput.innerText = `str.replace(${reg},"${replaceText}") \n returns "${replace}" \noriginal string length: ${strInput.value.length} \n new string length: ${replace.length} \n items replaced: ${match.length}`
        }
        ////checks for methods to remove styling from methods not chosen
        if (!state.methods.includes("test")) {
            testOutput.removeAttribute("class")
        }
        if (!state.methods.includes("match")) {
            matchOutput.removeAttribute("class")
        }
        if (!state.methods.includes("split")) {
            splitOutput.removeAttribute("class")
        }
        if (!state.methods.includes("replace")) {
            replaceOutput.removeAttribute("class")
            showInput.removeAttribute("required")
        }
    }
    //if test returns false then remove styling and display warning card
    else {
        outputCard.removeAttribute("class")
        warningCard.setAttribute("class", "warningCard")
        warning.setAttribute("class", "cardFont")
        warning.innerText = `const reg = ${reg} \n returned 0 results.`
    }

}

regForm.addEventListener("submit", (e) => {
    console.log(state.methods)
    console.log(state.flags)
    e.preventDefault()
    //clear innertext from all outputs to change on submission
    regExOutput.innerText = ""
    testOutput.innerText = ""
    matchOutput.innerText = ""
    splitOutput.innerText = ""
    replaceOutput.innerText = ""
    warning.innerText = ""
    ///function to check for and run methods
    handleRegex()
}

)


