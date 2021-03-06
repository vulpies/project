import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import NavBar from "../components/navbar/navBar"
import { AiOutlinePlusCircle } from "react-icons/ai"
import AllNotes from "../components/notes/allNotes"
import buttons from "../components/buttons/buttons.module.css"
import styles from "../components/notes/notes.module.css"
import { useDispatch, useSelector } from "react-redux"
import { useHttp } from "../hooks/useHttp"
import { getNotes } from "../store/notesSlice"
import { Spinner } from "react-bootstrap"

const AllNotesPage = () => {
    const notes = useSelector((state) => state.notesReducer.notes)
    const { request } = useHttp()
    const dispatch = useDispatch()

    let url = new URL("https://dip-project.herokuapp.com/api/notes/")
    url.searchParams.set("email", localStorage.getItem("email"))

    useEffect(() => {
        getNotesFromServer()
    }, [])

    const getNotesFromServer = () => {
        request(url)
            .then((req) => dispatch(getNotes(req)))
            .catch((err) => console.log(err))
    }

    if (!notes) {
        return (
            <Spinner
                animation="border"
                variant="primary"
                style={{ marginTop: 200 }}
            />
        )
    }

    return (
        <>
            <NavBar />
            <div className={buttons.wrapper}>
                <Link
                    to="/createnote"
                    className={`${buttons.common} ${buttons.add}`}
                >
                    {<AiOutlinePlusCircle />} Добавить заметку
                </Link>
            </div>

            <div className={`row ${styles.mainBlock}`}>
                {notes.length ? (
                    <AllNotes />
                ) : (
                    <>
                        <h2 className={styles.blindMsg}>
                            Сейчас у вас нет заметок
                        </h2>
                    </>
                )}
            </div>
        </>
    )
}

export default AllNotesPage
