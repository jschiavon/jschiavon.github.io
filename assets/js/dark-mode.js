var r = document.querySelector(':root');


function toggleDarkMode() {
    var rs = getComputedStyle(r);
    var butt = document.getElementById('darkbutt');
    if (rs.getPropertyValue('--theme') == 'dark') {
        setLight(rs);
        butt.innerHTML = 'Dark';
    } else {
        setDark(rs);
        butt.innerHTML = 'Light';
    }
}


function setDark(rs) {
    var rs = getComputedStyle(r);
    rs.setProperty('--theme', 'dark');
    rs.setProperty('--bg', rs.getPropertyValue('--grayblack'));
    rs.setProperty('--altbg', rs.getPropertyValue('--blackish'));
    rs.setProperty('--clr', rs.getPropertyValue('--gray'));
    rs.setProperty('--txtclr', rs.getPropertyValue('--lightgray'));
    rs.setProperty('--secclr', rs.getPropertyValue('--white'));
    rs.setProperty('--titclr', rs.getPropertyValue('--white'));
    rs.setProperty('--txtcontr', rs.getPropertyValue('--darkergray'));
    rs.setProperty('--titcontr', rs.getPropertyValue('--black'));
    rs.setProperty('--btnclr', rs.getPropertyValue('--prp'));
    rs.setProperty('--btntxt', rs.getPropertyValue('--bg'));
    rs.setProperty('--btnbrd', rs.getPropertyValue('--prp'));
    rs.setProperty('--btnsdw', rs.getPropertyValue('--prptransp'));
    rs.setProperty('--navbg', rs.getPropertyValue('--bg'));
    rs.setProperty('--navicn', rs.getPropertyValue('--titclr'));
    rs.setProperty('--navtxt', rs.getPropertyValue('--txtclr'));
    rs.setProperty('--navsdw', rs.getPropertyValue('--graytransp'));
    rs.setProperty('--headclr', rs.getPropertyValue('--bg'));
    rs.setProperty('--headsub', rs.getPropertyValue('--prp'));
}

function setLight(rs) {
    rs.setProperty('--theme', 'light');
    rs.setProperty('--bg', rs.getPropertyValue('--white'));
    rs.setProperty('--altbg', rs.getPropertyValue('--lightgray'));
    rs.setProperty('--clr', rs.getPropertyValue('--gray'));
    rs.setProperty('--txtclr', rs.getPropertyValue('--darkgray'));
    rs.setProperty('--secclr', rs.getPropertyValue('--black'));
    rs.setProperty('--titclr', rs.getPropertyValue('--darkergray'));
    rs.setProperty('--txtcontr', rs.getPropertyValue('--lightgray'));
    rs.setProperty('--titcontr', rs.getPropertyValue('--white'));
    rs.setProperty('--btnclr', rs.getPropertyValue('--prp'));
    rs.setProperty('--btntxt', rs.getPropertyValue('--bg'));
    rs.setProperty('--btnbrd', rs.getPropertyValue('--prp'));
    rs.setProperty('--btnsdw', rs.getPropertyValue('--prptransp'));
    rs.setProperty('--navbg', rs.getPropertyValue('--bg'));
    rs.setProperty('--navicn', rs.getPropertyValue('--titclr'));
    rs.setProperty('--navtxt', rs.getPropertyValue('--txtclr'));
    rs.setProperty('--navsdw', rs.getPropertyValue('--graytransp'));
    rs.setProperty('--headclr', rs.getPropertyValue('--bg'));
    rs.setProperty('--headsub', rs.getPropertyValue('--prp'));
}
