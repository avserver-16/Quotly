import FlowingMenu from "./FlowingMenu";
export default function MyCards() {
    const demoItems = [

        { link: '#', text: 'C++' },
        { link: '#', text: 'Python' },
        { link: '#', text: 'Java' },
        { link: '#', text: 'JavaScript' },

        { link: '#', text: 'C++' },
        { link: '#', text: 'Python' },
        { link: '#', text: 'Java' },
        { link: '#', text: 'JavaScript' },

        { link: '#', text: 'C++' },
        { link: '#', text: 'Python' },
        { link: '#', text: 'Java' },
        { link: '#', text: 'JavaScript' },

        { link: '#', text: 'C++' },
        { link: '#', text: 'Python' },
        { link: '#', text: 'Java' },
        { link: '#', text: 'JavaScript' },

        { link: '#', text: 'C++' },
        { link: '#', text: 'Python' },
        { link: '#', text: 'Java' },
        { link: '#', text: 'JavaScript' },
        { link: '#', text: 'JavaScript' },
    ];
    return (
        <div style={{ position: 'relative', paddingBottom: '40px', paddingTop: '20px', paddingLeft: 32, paddingRight: 32, backgroundColor: 'rgba(0,0,0,0)' }}>

            <FlowingMenu items={demoItems} />
        </div>);
}