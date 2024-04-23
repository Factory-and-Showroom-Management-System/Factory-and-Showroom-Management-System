import React from 'react'

const FormEditUser = () => {
  return (
    <div>
    <h1 style={{ color: 'black' }} className="title">Users</h1>
    <h2 style={{ color: 'black' }} className="subtitle">Update User</h2>
    <div className="card is-shadowless">
        <div className="card-content">
            <div className="content">
                <form>
                <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input  className="input" type="text" placeholder="Name" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input  className="input" type="text" placeholder="Username" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" type="password" placeholder="******" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label"> Confirm Password</label>
                        <div className="control">
                            <input className="input" type="password" placeholder="******" />
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label'>Role</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select>
                                    <option value="admin">Admin</option>
                                    <option value="sales_manager">Sales Manager</option>
                                    <option value="inventory_manager">Inventory Maneger</option>
                                    <option value="financial_manager">Financial Manager</option>
                                    <option value="production_manager">Production Manager</option>
                                    <option value="hr_manager">HR Manager</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className='field'>
                        <div className='control'>
                        <button className='button is-success'>
                            Update
                        </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default FormEditUser;