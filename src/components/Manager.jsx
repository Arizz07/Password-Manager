import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
uuidv4();

function Manager() {
    const ref = useRef()
    const passRef = useRef()
    const [form, setForm] = useState({
        url: "",
        user: "",
        pass: "",
    })
    const [passwordArray, setPasswordArray] = useState([])
    const [editId, setEditId] = useState(null)
    useEffect(() => {
        const fetchPass = async () => {
            let res = await fetch('https://pass-backend-xny5.onrender.com/api/password/get')
            const data = await res.json()
            console.log(data)
            const formattedData = data.map(item => ({
                ...item,
                id: item._id

            }))
            console.log("FD", formattedData)
            setPasswordArray(formattedData)



        }

        fetchPass()
    }, [])

    const showPass = () => {
        if (ref.current.src.includes("/Eye1.png")) {
            ref.current.src = "/EyeCross5.png"
            passRef.current.type = "text"

        } else {
            ref.current.src = "/Eye1.png"
            passRef.current.type = "password"

        }

    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })

    }

    const savePassword = async (form) => {
        try {
            console.log(form)
            if (form.url.length >= 3 && form.user.length >= 3 && form.pass.length >= 3) {
                if (editId) {
                    console.log("id is",editId)
                const res =  await fetch('https://pass-backend-xny5.onrender.com/api/password/addbyid', {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({...form,id:editId})
                })
                const result = await res.json()
                console.log("put request set",result)
                if(res.ok){
                    setPasswordArray(prev =>prev.map(i=>i.id === editId ? {...form,id:editId}:i))
                    setEditId(null)
                    setForm({url:'',user:"",pass:''})

                }
                } else {
                    let data = await fetch('https://pass-backend-xny5.onrender.com/api/password/add', {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(form)
                    })
                    let res = await data.json()
                    if (res && res.data) {
                        console.log("fetchd data", res)
                        const NewEntry = {
                            url: res.data.url,
                            user: res.data.user,
                            pass: res.data.pass,
                            id: res.data._id
                        }
                        setPasswordArray(prev => [...prev, NewEntry])
                        console.log("updated", NewEntry)


                        setForm({ url: '', user: '', pass: '' })

                    }
                }
            } else {
                toast.warning("password not saved")
            }



        } catch (err) {
            console.error(err)
        }


    }

    const handleEdit = async (id) => {
        alert("do you want to edit")
        console.log("editing id:", id)
        const item = passwordArray.filter(i => i.id === id)[0]
        if (item) {
            setForm({
                url: item.url,
                user: item.user,
                pass: item.pass
            })
            setEditId(id)
         
        }
    }
    


    

    const handleDelete = async (id) => {
        let c = confirm("do you want to delete this password")
        if (c) {
            console.log("deleting id:", id)
           const response= await fetch('https://pass-backend-xny5.onrender.com/api/password/delete',{
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id})
        
        })
            const res = await response.json()
            if(response.ok){

            setPasswordArray(prev=>prev.filter(item => item.id !== id))
            toast.success("Password Deleted")
            }
        }


    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        console.log("copied text", text)
        toast('text copied to Clipboard', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }





    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="absolute top-12 -z-10 h-full min-w-full">

                <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px]
                 w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(152,186,204,0.5)]
                  opacity-50 blur-[80px]">
                </div></div>
            <div className="p-2 md:container min-h-[91.5vh] mx-auto">
                <div className="header">
                    <div className='flex items-center justify-center'>
                        <span className='text-green-400 text-2xl font-bold' >&lt;</span>
                        <h2 className='text-black text-2xl font-bold'>Pass</h2>
                        <span className='text-green-400 text-2xl font-bold'  >OP/&gt;</span>
                    </div>
                    <div className="desc flex justify-center items-center">
                        <span className='text-xs font-semibold text-center'>Your Password Manager</span>
                    </div>
                </div>
                <div className="input-group flex flex-col w-full">
                    <div className='px-2 py-3'>
                        <input placeholder='Enter Website URL' value={form.url} onChange={handleChange} className='w-full rounded-full border py-1 px-2 border-teal-700' type="text" name="url" />
                    </div>
                    <div className='py-3 flex flex-col md:flex-row gap-4 px-2 w-[100%]' >
                        <input placeholder='Enter Username ' value={form.user} onChange={handleChange} className='w-full rounded-full px-2 py-1 border border-teal-700 ' type="text" name="user" />
                        <div className='relative '>
                            <input ref={passRef} placeholder='Enter Password' value={form.pass} onChange={handleChange} className='w-full rounded-full px-2 py-1 border border-teal-700 ' id='pass' type="password" name="pass" />
                            <div className="absolute right-2 top-2"><img ref={ref} className='w-4 cursor-pointer' onClick={showPass} src="/Eye1.png" alt="Eye" /></div>
                        </div>
                    </div>
                    <div className='mx-2 my-4 flex justify-center items-center'>
                        <button onClick={() => savePassword(form)} className='bg-teal-400 rounded-lg px-3  py-1 flex justify-center items-center gap-1 '>
                            <span className=''><lord-icon className={'pt-1'}
                                src="https://cdn.lordicon.com/sbnjyzil.json"
                                trigger="hover"
                                colors="primary:#121331,secondary:#109173"
                            >
                            </lord-icon></span>
                            <span className=''>Save </span>
                        </button>
                    </div>
                </div>
                <div className="tables w-full">
                    <span className='text-lg font-semibold'>Saved Passwords</span>

                    {passwordArray.length == 0 ? <div>No Records to Show</div> :
                        <table className="table-auto text-sm   text-white my-4 w-full">
                            <thead className='bg-teal-700 '>
                                <tr >
                                    <th>URL</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody className='bg-teal-200 w-full'>
                                {passwordArray.map((item, id) => {
                                    return <tr key={item.id} className='text-center text-black   '>


                                        <td>
                                            <div className='flex justify-center items-center text-sm  '>
                                                <span>{item.url}</span>
                                                <span onClick={() => copyText(item.url)}>
                                                    <lord-icon className={"w-4 px-1 py-1"}
                                                        src="https://cdn.lordicon.com/xuoapdes.json"
                                                        trigger="hover"
                                                    >
                                                    </lord-icon>
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            <div className='flex justify-center items-center px-2 py-1 text-sm '>
                                                <span>{item.user}</span>
                                                <span onClick={() => copyText(item.user)}>
                                                    <lord-icon className={"w-4 px-1 py-1"}
                                                        src="https://cdn.lordicon.com/xuoapdes.json"
                                                        trigger="hover"
                                                    >
                                                    </lord-icon>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='flex justify-center items-center px-2 py-1 text-sm '>
                                                <span>{item.pass}</span>
                                                <span onClick={() => copyText(item.pass)}>
                                                    <lord-icon className={"w-4 px-1 py-1"}
                                                        src="https://cdn.lordicon.com/xuoapdes.json"
                                                        trigger="hover"
                                                    >
                                                    </lord-icon>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='flex justify-center items-center px-2 py-1 '>
                                                <span>
                                                    <button onClick={() => handleEdit(item.id)} className='font-bold px-2'>
                                                        <lord-icon className={'w-4'}
                                                            src="https://cdn.lordicon.com/exymduqj.json"
                                                            trigger="hover"

                                                        >
                                                        </lord-icon>
                                                    </button>
                                                </span>
                                                <span>
                                                    <button onClick={() => handleDelete(item.id)} className='font-bold px-2'>
                                                        <lord-icon className={'w-4'}
                                                            src="https://cdn.lordicon.com/jzinekkv.json"
                                                            trigger="hover"
                                                        >
                                                        </lord-icon>
                                                    </button>
                                                </span>
                                            </div>
                                        </td>


                                    </tr>
                                })}


                            </tbody>
                        </table>
                    }
                </div>

            </div>

        </>
    )
}

export default Manager