///          BLADE CONTENT
const buttonClass = document.querySelectorAll('.button_class_child')
const championImg = document.querySelector('.tab_img_child')
const championName = document.querySelector('.tab_name')
const championTitle = document.querySelector('.tab_title')

const championInfo = {
    assassin: {
        image: 'akali.jpg',
        name: 'AKALI',
        description: 'Sát Thủ Đơn Độc',
    },

    gladiator: {
        image: 'ys.jpg',
        name: 'YASUO',
        description: 'Kẻ Bất Dung Thứ',
    },

    magician: {
        image: 'lux.jpg',
        name: 'LUX',
        description: 'Tiểu Thư Ánh Sáng',
    },

    gunner: {
        image: 'jinx.jpg',
        name: 'JINX',
        description: 'Khẩu Pháo Nổi Loạn',
    },

    support: {
        image: 'thresh.jpg',
        name: 'THRESH',
        description: 'Cai Ngục Xiềng Xích',
    },
};

buttonClass.forEach(button => {
    button.addEventListener('click', () => {
        const type = button.dataset.type;
        if (championInfo[type]) {
            championImg.src = championInfo[type].image;
            championName.innerText = championInfo[type].name;
            championTitle.innerText = championInfo[type].description;
        }
        else alert('ERRO')
    });
});

//////////////////////////////////////////////

// BACKGROUND VIDEO CONENT

const buttonVideo = document.querySelectorAll('.bg_type_li')
const bgVideo = document.querySelector('.src_video')
const bgTitle = document.querySelector('.bg_video_title')
const bgDescription = document.querySelector('.bg_video_description')

const listVideo = {
    summonerRift: {
        video: 'SRift.mp4',
        title: 'CHẾ ĐỘ CHƠI PHỔ BIẾN NHẤT',
        description: 'Dọn đường, tham gia giao tranh tổng, phá hủy Nhà Chính của địch trước khi Nhà Chính của bạn bị phá hủy.'
    },
    aram: {
        video: 'aram.mp4',
        title: 'TẤT CẢ NGẪU NHIÊN, CHỈ ĐI ĐƯỜNG GIỮA',
        description: 'Chiến đấu trên một cây cầu băng giá với những vị tướng ngẫu nhiên để xông thẳng tới Nhà Chính của địch trong chế độ 5v5 vui nhộn và hỗn loạn.'
    },
    DTCL: {
        video: 'dtcl.mp4',
        title: 'MỘT TRẬN HỖN CHIẾN ĐỂ GIÀNH NGÔI VỊ BÁ CHỦ',
        description: 'Tập hợp những vị tướng để chiến đấu cho bạn. Vượt qua 7 đối thủ khác để trở thành người sống sót cuối cùng.'
    },

};

buttonVideo.forEach(button => {
    button.addEventListener('click', () => {
        const list = button.dataset.type;
        if ( listVideo[list]) {
            bgVideo.src = listVideo[list].video;
            bgTitle.innerText = listVideo[list].title;
            bgDescription.innerText = listVideo[list].description;
        }else alert(console.log('erro'))
    })
})