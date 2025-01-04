const EnterColor = document.querySelector('.enter-color-code') 
const EnterWidth = document.querySelector('.enter-width')
const EnterHeight = document.querySelector('.enter-height')
const BntSubmit = document.querySelector('.bnt-submit')
const OutputContent = document.querySelector('.content')
   

BntSubmit.addEventListener (
        'click',
        function () {
            const InputColor = EnterColor.value;
            const InputHeight = EnterHeight.value;
            const InputWidth = EnterWidth.value;

            if (!InputColor || !InputHeight || !InputWidth) {
                alert("Điền thiếu thông tin")
                return;
            }

            OutputContent.style.backgroundColor = InputColor;
            OutputContent.style.height = InputHeight + 'px';
            OutputContent.style.width = InputWidth + 'px';

        }
)
const ClearAll = () => {
    if (OutputContent.offsetWidth  > 0 || OutputContent.offsetHeight > 0  ) {
        EnterColor.value ='';
        EnterWidth.value ='';
        EnterHeight.value ='';
        OutputContent.style.backgroundColor = '';
        OutputContent.style.height = 0;
        OutputContent.style.width = 0;
    } 
}

EnterColor.addEventListener(
    'click',
     ClearAll
)
EnterWidth.addEventListener(
    'click',
    ClearAll
)
EnterHeight.addEventListener(
    'click',
    ClearAll
)
