import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Repositories.module.css';

interface Repo {
    id: number;
    name: string;
    html_url: string;
}

const Repositories = () => {
    const { login } = useParams<{ login: string }>();
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${login}/repos`);
                if (!response.ok) throw new Error('Erro ao buscar repositórios');
                const data = await response.json();
                setRepos(data);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (login) {
            fetchRepos();
        }
    }, [login]);

    if (loading) return <p>Carregando repositórios...</p>;
    if (error) return <p>Erro ao carregar repositórios. Tente novamente.</p>;

    return (
        <div className={styles.repositories}>
            <h2>Repositórios de {login}</h2>
            <ul>
                {repos.slice(0, 8).map(repo => ( 
                    <li key={repo.id} className={styles.repoItem}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            {repo.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Repositories;
