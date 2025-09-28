import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Plus, MoreHorizontal, Eye, Edit, UserMinus } from "lucide-react"
import { useState, useMemo } from "react"

// Helper function to get status variant
const getStatusVariant = (status: string) => {
  switch (status) {
    case "active":
      return "success"
    case "trial":
      return "info"
    case "suspended":
      return "error"
    default:
      return "secondary"
  }
}

const mockTenants = [
  {
    id: 1,
    name: "Acme Corporation",
    email: "admin@acme.com",
    createdDate: "2024-01-15",
    plan: "Enterprise",
    status: "active",
    users: 45
  },
  {
    id: 2,
    name: "TechStart Inc",
    email: "contact@techstart.com",
    createdDate: "2024-02-20",
    plan: "Professional",
    status: "active",
    users: 12
  },
  {
    id: 3,
    name: "DataFlow Ltd",
    email: "info@dataflow.co",
    createdDate: "2024-01-08",
    plan: "Starter",
    status: "suspended",
    users: 5
  },
  {
    id: 4,
    name: "CloudTech Pro",
    email: "hello@cloudtech.com",
    createdDate: "2024-03-12",
    plan: "Enterprise",
    status: "active",
    users: 89
  },
  {
    id: 5,
    name: "RetailX",
    email: "support@retailx.com",
    createdDate: "2024-02-28",
    plan: "Professional",
    status: "trial",
    users: 8
  }
]

const Tenants = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")
  const [selectedTenant, setSelectedTenant] = useState<any>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [suspendModalOpen, setSuspendModalOpen] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    plan: "",
    status: "",
    users: 0
  })
  const [confirmationText, setConfirmationText] = useState("")
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    plan: "Starter",
    status: "trial",
    users: 1
  })
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})
  const [isCreating, setIsCreating] = useState(false)

  // Filter tenants based on search term and filters
  const filteredTenants = useMemo(() => {
    return mockTenants.filter((tenant) => {
      const matchesSearch = 
        tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.email.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === "all" || tenant.status === statusFilter
      
      const matchesPlan = planFilter === "all" || 
        tenant.plan.toLowerCase() === planFilter.toLowerCase()
      
      return matchesSearch && matchesStatus && matchesPlan
    })
  }, [searchTerm, statusFilter, planFilter])

  // Handler functions for actions
  const handleViewDetails = (tenant: any) => {
    setSelectedTenant(tenant)
    setViewModalOpen(true)
  }

  const handleEditTenant = (tenant: any) => {
    setSelectedTenant(tenant)
    setEditForm({
      name: tenant.name,
      email: tenant.email,
      plan: tenant.plan,
      status: tenant.status,
      users: tenant.users
    })
    setEditModalOpen(true)
  }

  const handleSuspendTenant = (tenant: any) => {
    setSelectedTenant(tenant)
    setConfirmationText("")
    setSuspendModalOpen(true)
  }

  const handleSaveEdit = () => {
    // Here you would typically make an API call to update the tenant
    console.log("Saving tenant:", selectedTenant.id, editForm)
    setEditModalOpen(false)
    // You could also update the mockTenants array here for demo purposes
  }

  const handleConfirmSuspend = () => {
    // Here you would typically make an API call to suspend the tenant
    console.log("Suspending tenant:", selectedTenant.id)
    console.log("Confirmation text:", confirmationText)
    console.log("Tenant name:", selectedTenant?.name)
    setSuspendModalOpen(false)
    setConfirmationText("")
    // You could also update the mockTenants array here for demo purposes
  }

  // Form validation
  const validateForm = () => {
    const errors: {[key: string]: string} = {}
    
    if (!createForm.name.trim()) {
      errors.name = "Company name is required"
    } else if (createForm.name.trim().length < 2) {
      errors.name = "Company name must be at least 2 characters"
    }
    
    if (!createForm.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(createForm.email)) {
      errors.email = "Please enter a valid email address"
    }
    
    if (!createForm.plan) {
      errors.plan = "Please select a plan"
    }
    
    if (createForm.users < 1) {
      errors.users = "Number of users must be at least 1"
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleCreateTenant = async () => {
    if (!validateForm()) {
      return
    }
    
    setIsCreating(true)
    
    try {
      // Here you would typically make an API call to create the tenant
      console.log("Creating tenant:", createForm)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Reset form and close modal
      setCreateForm({
        name: "",
        email: "",
        plan: "Starter",
        status: "trial",
        users: 1
      })
      setFormErrors({})
      setCreateModalOpen(false)
      
      // You could also add the new tenant to mockTenants array here for demo purposes
      
    } catch (error) {
      console.error("Error creating tenant:", error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleCreateModalOpen = () => {
    setCreateForm({
      name: "",
      email: "",
      plan: "Starter",
      status: "trial",
      users: 1
    })
    setFormErrors({})
    setCreateModalOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tenants</h1>
            <p className="text-muted-foreground">
              Manage your SaaS platform tenants and their subscriptions.
            </p>
          </div>
          <Button onClick={handleCreateModalOpen}>
            <Plus className="mr-2 h-4 w-4" />
            Add Tenant
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Tenants</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search tenants..."
                    className="pl-9 w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="trial">Trial</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={planFilter} onValueChange={setPlanFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="starter">Starter</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table className="data-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No tenants found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTenants.map((tenant) => (
                    <TableRow key={tenant.id}>
                      <TableCell className="font-medium">{tenant.name}</TableCell>
                      <TableCell>{tenant.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{tenant.plan}</Badge>
                      </TableCell>
                      <TableCell>{tenant.users}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(tenant.status)}>
                          {tenant.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{tenant.createdDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(tenant)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditTenant(tenant)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Tenant
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleSuspendTenant(tenant)}
                          >
                            <UserMinus className="mr-2 h-4 w-4" />
                            Suspend
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* View Details Modal */}
        <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tenant Details</DialogTitle>
              <DialogDescription>
                View detailed information about {selectedTenant?.name}
              </DialogDescription>
            </DialogHeader>
            {selectedTenant && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Company Name</label>
                    <p className="text-lg font-semibold">{selectedTenant.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-lg">{selectedTenant.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Plan</label>
                    <Badge variant="outline" className="mt-1">{selectedTenant.plan}</Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="mt-1">
                      <Badge variant={getStatusVariant(selectedTenant.status)}>
                        {selectedTenant.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Users</label>
                    <p className="text-lg">{selectedTenant.users}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Created Date</label>
                    <p className="text-lg">{selectedTenant.createdDate}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewModalOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Tenant Modal */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Tenant</DialogTitle>
              <DialogDescription>
                Update information for {selectedTenant?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Company Name</label>
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Plan</label>
                  <Select value={editForm.plan} onValueChange={(value) => setEditForm({...editForm, plan: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Starter">Starter</SelectItem>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select value={editForm.status} onValueChange={(value) => setEditForm({...editForm, status: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="trial">Trial</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Users</label>
                  <Input
                    type="number"
                    value={editForm.users}
                    onChange={(e) => setEditForm({...editForm, users: parseInt(e.target.value) || 0})}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Suspend Tenant Modal - GitHub Style */}
        <Dialog open={suspendModalOpen} onOpenChange={setSuspendModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-red-600">Suspend Tenant</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      This action cannot be undone
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>
                        This will suspend <strong>{selectedTenant?.name}</strong> and prevent them from accessing the platform. 
                        All their data will be preserved but they won't be able to log in.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirmation" className="text-sm font-medium text-gray-700">
                  Please type <strong>{selectedTenant?.name}</strong> to confirm:
                </label>
                <Input
                  id="confirmation"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                  placeholder={`Type ${selectedTenant?.name} to confirm`}
                  className="font-mono"
                />
                {confirmationText && (
                  <div className="text-xs text-gray-500">
                    {confirmationText.trim() === selectedTenant?.name ? (
                      <span className="text-green-600">✓ Names match</span>
                    ) : (
                      <span className="text-red-600">✗ Names don't match</span>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSuspendModalOpen(false)
                  setConfirmationText("")
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleConfirmSuspend}
                disabled={confirmationText.trim() !== selectedTenant?.name}
                className="bg-red-600 hover:bg-red-700"
              >
                Suspend Tenant
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Tenant Modal */}
        <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="pb-4">
              <DialogTitle className="flex items-center gap-2 text-lg">
                <div className="p-1.5 bg-blue-100 rounded-md">
                  <Plus className="h-4 w-4 text-blue-600" />
                </div>
                Create New Tenant
              </DialogTitle>
              <DialogDescription className="text-sm">
                Add a new tenant to your SaaS platform.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">
                  Company Information
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="create-name" className="text-xs font-medium text-gray-700 block mb-1">
                      Company Name *
                    </label>
                    <Input
                      id="create-name"
                      value={createForm.name}
                      onChange={(e) => setCreateForm({...createForm, name: e.target.value})}
                      placeholder="Enter company name"
                      className={`h-9 ${formErrors.name ? "border-red-300 focus:border-red-500" : ""}`}
                    />
                    {formErrors.name && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <label htmlFor="create-email" className="text-xs font-medium text-gray-700 block mb-1">
                      Contact Email *
                    </label>
                    <Input
                      id="create-email"
                      type="email"
                      value={createForm.email}
                      onChange={(e) => setCreateForm({...createForm, email: e.target.value})}
                      placeholder="admin@company.com"
                      className={`h-9 ${formErrors.email ? "border-red-300 focus:border-red-500" : ""}`}
                    />
                    {formErrors.email && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Subscription Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">
                  Subscription Details
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="create-plan" className="text-xs font-medium text-gray-700 block mb-1">
                      Plan *
                    </label>
                    <Select 
                      value={createForm.plan} 
                      onValueChange={(value) => setCreateForm({...createForm, plan: value})}
                    >
                      <SelectTrigger className={`h-9 ${formErrors.plan ? "border-red-300 focus:border-red-500" : ""}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Starter">Starter</SelectItem>
                        <SelectItem value="Professional">Professional</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.plan && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.plan}</p>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <label htmlFor="create-status" className="text-xs font-medium text-gray-700 block mb-1">
                      Status
                    </label>
                    <Select 
                      value={createForm.status} 
                      onValueChange={(value) => setCreateForm({...createForm, status: value})}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trial">Trial</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-full sm:w-32">
                    <label htmlFor="create-users" className="text-xs font-medium text-gray-700 block mb-1">
                      Users *
                    </label>
                    <Input
                      id="create-users"
                      type="number"
                      min="1"
                      value={createForm.users}
                      onChange={(e) => setCreateForm({...createForm, users: parseInt(e.target.value) || 1})}
                      className={`h-9 ${formErrors.users ? "border-red-300 focus:border-red-500" : ""}`}
                    />
                    {formErrors.users && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.users}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Plan Information - Compact */}
              <div className="bg-blue-50 rounded-md p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">Plan Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-blue-700">
                  <div>
                    <p className="font-medium">Starter</p>
                    <p>Basic features, up to 10 users</p>
                  </div>
                  <div>
                    <p className="font-medium">Professional</p>
                    <p>Advanced features, up to 100 users</p>
                  </div>
                  <div>
                    <p className="font-medium">Enterprise</p>
                    <p>All features, unlimited users</p>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setCreateModalOpen(false)}
                disabled={isCreating}
                size="sm"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateTenant}
                disabled={isCreating}
                className="bg-blue-600 hover:bg-blue-700"
                size="sm"
              >
                {isCreating ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-3 w-3" />
                    Create Tenant
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

export default Tenants