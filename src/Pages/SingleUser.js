"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useAppContext } from "../Components/ContextAPI"
import { Container, Card } from "../Components/GlobalStyle"
import { Button } from "../Styles/button"

const ProfileContainer = styled.div`
  min-height: 100vh;
  padding: 4rem 0;
`

const ProfileHeader = styled.section`
  text-align: center;
  margin-bottom: 4rem;
`

const ProfileTitle = styled.h1`
  font-size: 4rem;
  color: white;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`

const ProfileCard = styled(Card)`
  max-width: 600px;
  margin: 0 auto 4rem;
  text-align: center;
  
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 2rem;
    border: 4px solid #667eea;
  }
  
  h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }
  
  .email {
    color: #7f8c8d;
    font-size: 1.6rem;
    margin-bottom: 2rem;
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`

const StatCard = styled(Card)`
  text-align: center;
  
  .stat-number {
    font-size: 3rem;
    font-weight: bold;
    color: #667eea;
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    color: #7f8c8d;
    font-size: 1.4rem;
  }
`

const EditForm = styled.form`
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  max-width: 600px;
  margin: 0 auto;
`

const FormGroup = styled.div`
  margin-bottom: 2rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
  font-size: 1.4rem;
`

const Input = styled.input`
  width: 100%;
  padding: 1.2rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1.4rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #667eea;
    outline: none;
  }
`

const ActivityFeed = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const ActivityItem = styled(Card)`
  margin-bottom: 1rem;
  padding: 1.5rem;
  border-left: 4px solid #667eea;
  
  .activity-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .activity-type {
    font-weight: 600;
    color: #2c3e50;
  }
  
  .activity-time {
    color: #7f8c8d;
    font-size: 1.2rem;
  }
  
  .activity-description {
    color: #555;
    line-height: 1.6;
  }
`

const SingleUser = () => {
  const { user, notes, token, dispatch } = useAppContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [userStats, setUserStats] = useState({
    totalNotes: 0,
    financialNotes: 0,
    categoriesUsed: 0,
    totalExpenses: 0,
    totalIncome: 0,
  })

  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || "",
        email: user.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      calculateStats()
    }
  }, [user, notes])

  const calculateStats = () => {
    const financialNotes = notes.filter((note) => note.isFinancial)
    const categories = [...new Set(notes.map((note) => note.category))]
    const totalExpenses = financialNotes
      .filter((note) => note.transactionType === "expense")
      .reduce((sum, note) => sum + note.amount, 0)
    const totalIncome = financialNotes
      .filter((note) => note.transactionType === "income")
      .reduce((sum, note) => sum + note.amount, 0)

    setUserStats({
      totalNotes: notes.length,
      financialNotes: financialNotes.length,
      categoriesUsed: categories.length,
      totalExpenses,
      totalIncome,
    })
  }

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (editData.newPassword && editData.newPassword !== editData.confirmPassword) {
      alert("New passwords do not match!")
      return
    }

    try {
      // Simulate API call to update user profile
      const updateData = {
        name: editData.name,
        email: editData.email,
        ...(editData.newPassword && {
          currentPassword: editData.currentPassword,
          newPassword: editData.newPassword,
        }),
      }

      // For demo purposes, just update the context
      dispatch({
        type: "SET_USER",
        payload: {
          ...user,
          name: editData.name,
          email: editData.email,
        },
      })

      setIsEditing(false)
      setEditData({ ...editData, currentPassword: "", newPassword: "", confirmPassword: "" })
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile. Please try again.")
    }
  }

  const generateActivityFeed = () => {
    const activities = []

    // Add recent note activities
    notes.slice(0, 10).forEach((note) => {
      activities.push({
        type: "Note Created",
        description: `Created note: "${note.title}"`,
        time: new Date(note.createdAt).toLocaleDateString(),
        category: note.category,
      })
    })

    // Add financial activities
    const financialNotes = notes.filter((note) => note.isFinancial).slice(0, 5)
    financialNotes.forEach((note) => {
      activities.push({
        type: note.transactionType === "income" ? "Income Added" : "Expense Recorded",
        description: `${note.transactionType === "income" ? "Earned" : "Spent"} ₹${note.amount} - ${note.title}`,
        time: new Date(note.createdAt).toLocaleDateString(),
        category: "finance",
      })
    })

    return activities.sort((a, b) => new Date(b.time) - new Date(a.time))
  }

  if (!user) {
    return (
      <ProfileContainer>
        <Container>
          <ProfileHeader>
            <ProfileTitle>Please log in to view your profile</ProfileTitle>
          </ProfileHeader>
        </Container>
      </ProfileContainer>
    )
  }

  return (
    <ProfileContainer>
      <Container>
        <ProfileHeader>
          <ProfileTitle>My Profile</ProfileTitle>
        </ProfileHeader>

        <ProfileCard>
          <img src={user.avatar || "/placeholder.svg?height=120&width=120"} alt="Profile Avatar" className="avatar" />
          <h2>{user.name}</h2>
          <p className="email">{user.email}</p>
          <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit Profile"}</Button>
        </ProfileCard>

        {isEditing && (
          <EditForm onSubmit={handleSubmit}>
            <h3 style={{ marginBottom: "2rem", color: "#2c3e50" }}>Edit Profile</h3>

            <FormGroup>
              <Label htmlFor="name">Full Name</Label>
              <Input type="text" id="name" name="name" value={editData.name} onChange={handleInputChange} required />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <h4 style={{ marginBottom: "1rem", color: "#2c3e50" }}>Change Password (Optional)</h4>

            <FormGroup>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={editData.currentPassword}
                onChange={handleInputChange}
                placeholder="Enter current password"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                type="password"
                id="newPassword"
                name="newPassword"
                value={editData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter new password"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={editData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm new password"
              />
            </FormGroup>

            <Button type="submit" size="large">
              Update Profile
            </Button>
          </EditForm>
        )}

        <section style={{ marginTop: "4rem" }}>
          <h2 style={{ textAlign: "center", color: "white", marginBottom: "3rem" }}>Your Statistics</h2>
          <StatsGrid>
            <StatCard>
              <div className="stat-number">{userStats.totalNotes}</div>
              <div className="stat-label">Total Notes</div>
            </StatCard>
            <StatCard>
              <div className="stat-number">{userStats.financialNotes}</div>
              <div className="stat-label">Financial Notes</div>
            </StatCard>
            <StatCard>
              <div className="stat-number">{userStats.categoriesUsed}</div>
              <div className="stat-label">Categories Used</div>
            </StatCard>
            <StatCard>
              <div className="stat-number">₹{userStats.totalIncome}</div>
              <div className="stat-label">Total Income</div>
            </StatCard>
            <StatCard>
              <div className="stat-number">₹{userStats.totalExpenses}</div>
              <div className="stat-label">Total Expenses</div>
            </StatCard>
            <StatCard>
              <div className="stat-number">₹{userStats.totalIncome - userStats.totalExpenses}</div>
              <div className="stat-label">Net Balance</div>
            </StatCard>
          </StatsGrid>
        </section>

        <section style={{ marginTop: "4rem" }}>
          <h2 style={{ textAlign: "center", color: "white", marginBottom: "3rem" }}>Recent Activity</h2>
          <ActivityFeed>
            {generateActivityFeed().map((activity, index) => (
              <ActivityItem key={index}>
                <div className="activity-header">
                  <span className="activity-type">{activity.type}</span>
                  <span className="activity-time">{activity.time}</span>
                </div>
                <div className="activity-description">{activity.description}</div>
              </ActivityItem>
            ))}
          </ActivityFeed>
        </section>
      </Container>
    </ProfileContainer>
  )
}

export default SingleUser
