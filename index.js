setTimeout(function(){
    window.alert("Inserting multiple entries of the same type of data (i.e two PDF data) will cause the site to crash. Please be patient as I try to optimize the search algorithms. Thank you!")
}, 1000)

var convert = document.getElementById("convert");
convert.addEventListener("click", highlightText);
var total = ""

function highlightText(){
    input = document.getElementById("input").value.replace(/\s+/g, '').toLowerCase()
    items = []
    sigs = [["FF D8 FF","FF D9", "JPEG"], ["25 50 44 46 2D 31 2E", "25 25 45 4F 46", "PDF"], ["D0 CF 11 E0 A1 B1 1A E1", "57 6F 72 64 2E 44 6F 63 75 6D 65 6E 74 2E", "DOC"], ["D0 CF 11 E0 A1 B1 1A E1", "FE FF FF FF 00 00 00 00 00 00 00 00 57 00 6F 00 72 00 6B 00 62 00 6F 00 6F 00 6B 00", "XLS"], ["D0 CF 11 E0 A1 B1 1A E1", "50 00 6F 00 77 00 65 00 72 00 50 00 6F 00 69 00 6E 00 74 00 20 00 44 00 6F 00 63 00 75 00 6D 00 65 00 6E 00 74", "PPT"], ["50 4B 03 04 14", "50 4B 05 06 00", "ZIP"], ["47 49 46 38 39 61 4E 01 53 00 C4", "21 00 00 3B 00", "GIF"]]
    signature = "however"
    console.log(input)
    for (i =0; i < sigs.length; i++){
        readthis = input
        var firstsig = sigs[i][0].replace(/\s+/g, '').toLowerCase()
        var secondsig = sigs[i][1].replace(/\s+/g, '').toLowerCase()
        var filetype = sigs[i][2]
        // console.log(firstsig,secondsig,filetype)
        console.log("approved", input, filetype, secondsig, i)
            start = readthis.indexOf(firstsig)
            end = readthis.indexOf(secondsig) + secondsig.length
            signature = readthis.slice(start, end)
            if (signature.length > firstsig.length + secondsig.length ) {
                items.push({
                    sig : signature,
                    type: filetype
                });
                total = total.concat(signature + `
`);
            };
            readthis = input.slice(end, input.length);

    }

    var response = document.getElementById("accordionPanelsStayOpenExample");
    response.innerHTML = items.map((item, key) => {
        return(
            `
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-heading${key}">
                <button class="accordion-button ${item.type}" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${key}" aria-expanded="true" aria-controls="panelsStayOpen-collapse${key}">
                    Signature ${key} | Type: ${item.type}
                </button>
                </h2>
                <div id="panelsStayOpen-collapse${key}" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-heading${key}">
                    <input type="text" class="inp-inv" name="" placeholder="some text" value=${item.sig} id ="show${key}">
                    <div class="accordion-body" title="Click to Copy!" id="signature-body" onclick="copy(${key})">
                        ${item.sig}
                    </div>
                </div>
            </div>
            
            `
        )
    }).join('');
    console.log(total) 
}


function copy(key) {
    const idd = document.getElementById("show"+key.toString())
    idd.select();
    document.execCommand("Copy");
}

function copyLineBreak(){
    var codeToBeCopied = total;
    var emptyArea = document.createElement('TEXTAREA');
    emptyArea.innerHTML = codeToBeCopied;
    const parentElement = document.getElementById('post-title');
    parentElement.appendChild(emptyArea);
 
    emptyArea.select();
    document.execCommand('copy');
 
    parentElement.removeChild(emptyArea);
    }

var clear = document.getElementById("clear")
clear.addEventListener("click", function(){
    document.getElementById("input").value = ""
    document.getElementById("accordionPanelsStayOpenExample").innerHTML= "Enter a new signature!"
})
