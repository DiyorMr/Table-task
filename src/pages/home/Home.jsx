import { useNavigate } from 'react-router-dom';
import TableComponent from '../../components/TableComponent';
import { useAuth } from '../../providers/auth';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Home() {
    const auth = useAuth()
    const navigate = useNavigate();
    const [data, setData] = useState([])

    const handleExit = () => {
        auth.logout()
        navigate('/');
    };

    useEffect(() => {
        axios
            .get(
                'http://apialfa.apoint.uz/v1/reports/reports/materials?sort=name&start=01.07.2025&end=31.07.2025',
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                }
            )
            .then(res => {
                if (res.status === 200) {
                    const data = Array.isArray(res.data) ? res.data : []
                    const groupedData = [];

                    // Helper to find or create parent group
                    function getParentGroup(parent) {
                        let group = groupedData.find(g => g.parent === parent);
                        if (!group) {
                            group = { parent: parent, categories: [] };
                            groupedData.push(group);
                        }
                        return group;
                    }

                    // Helper to find or create category group under a parent
                    function getCategoryGroup(parentGroup, category) {
                        let catGroup = parentGroup.categories.find(c => c.category === category);
                        if (!catGroup) {
                            catGroup = { category: category, items: [] };
                            parentGroup.categories.push(catGroup);
                        }
                        return catGroup;
                    }

                    // Main grouping logic
                    data.forEach(item => {
                        const parentGroup = getParentGroup(item.parent);
                        const categoryGroup = getCategoryGroup(parentGroup, item.category);
                        categoryGroup.items.push(item);
                    });
                    setData(groupedData);
                }
            })
            .catch((error) => console.error(error))
    }, [])


    return (
        <div className="login-container">
            <div>
                <TableComponent data={data} />
                <button onClick={handleExit} className="login-button" style={{ marginTop: '20px' }}>
                    Exit
                </button>
            </div>
        </div>
    );
}

export default Home;
